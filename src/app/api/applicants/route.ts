import { ObjectId, type WithId } from "mongodb";
import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/adminAuth";
import { DatabaseConfigurationError, getDatabase } from "@/lib/mongodb";
import type { Applicant, ApplicantInput, ApplicantRole } from "@/types";

const APPLICANT_ROLES: ApplicantRole[] = [
  "influencer",
  "content-creator",
  "intern",
  "multiple",
];

interface ApplicantDocument extends ApplicantInput {
  createdAt: Date;
}

function getApplicantsCollection() {
  return getDatabase().then((database) =>
    database.collection<ApplicantDocument>("applicants"),
  );
}

function databaseErrorResponse(error: unknown, action: string) {
  console.error(`${action}:`, error instanceof Error ? error.message : error);

  if (error instanceof DatabaseConfigurationError) {
    return NextResponse.json(
      {
        error:
          "Application database is not configured. Please contact the administrator.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json(
    { error: "Database connection failed. Please try again shortly." },
    { status: 503 },
  );
}

function readString(value: unknown, maximumLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maximumLength) : "";
}

function createApplicantDocument(body: unknown): ApplicantDocument | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const values = body as Record<string, unknown>;
  const role = readString(values.role, 40) as ApplicantRole;
  const followers = readString(values.followers, 30).replace(/,/g, "");
  const document: ApplicantDocument = {
    name: readString(values.name, 120),
    phone: readString(values.phone, 20),
    email: readString(values.email, 160),
    city: readString(values.city, 120),
    role,
    instagram: readString(values.instagram, 120),
    followers: Number(followers).toLocaleString("en-IN"),
    niche: readString(values.niche, 120),
    bio: readString(values.bio, 1200),
    createdAt: new Date(),
  };

  if (
    !document.name ||
    !/^\d{10}$/.test(document.phone) ||
    !document.email.includes("@") ||
    !document.email.includes(".") ||
    !APPLICANT_ROLES.includes(role) ||
    !document.instagram ||
    !followers ||
    !Number.isFinite(Number(followers)) ||
    Number(followers) < 0 ||
    !document.niche
  ) {
    return null;
  }

  return document;
}

function serializeApplicant(document: WithId<ApplicantDocument>): Applicant {
  return {
    id: document._id.toHexString(),
    name: document.name,
    phone: document.phone,
    email: document.email,
    city: document.city,
    role: document.role,
    instagram: document.instagram,
    followers: document.followers,
    niche: document.niche,
    bio: document.bio,
    date: document.createdAt.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
    }),
  };
}

export async function GET() {
  try {
    if (!(await hasAdminSession())) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const applicants = await (await getApplicantsCollection())
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      applicants: applicants.map(serializeApplicant),
    });
  } catch (error) {
    return databaseErrorResponse(error, "Unable to load applicants");
  }
}

export async function POST(request: Request) {
  try {
    const applicant = createApplicantDocument(await request.json());

    if (!applicant) {
      return NextResponse.json(
        { error: "Invalid applicant data." },
        { status: 400 },
      );
    }

    const collection = await getApplicantsCollection();
    const result = await collection.insertOne(applicant);

    return NextResponse.json(
      {
        applicant: serializeApplicant({ ...applicant, _id: result.insertedId }),
      },
      { status: 201 },
    );
  } catch (error) {
    return databaseErrorResponse(error, "Unable to save applicant");
  }
}

export async function DELETE(request: Request) {
  try {
    if (!(await hasAdminSession())) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const collection = await getApplicantsCollection();
    const id = new URL(request.url).searchParams.get("id");

    if (!id) {
      await collection.deleteMany({});
      return NextResponse.json({ deleted: true });
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid applicant id." },
        { status: 400 },
      );
    }

    await collection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ deleted: true });
  } catch (error) {
    return databaseErrorResponse(error, "Unable to delete applicants");
  }
}
