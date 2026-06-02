import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const ADMIN_SESSION_COOKIE = "raja_admin_session";
const ADMIN_SESSION_SECONDS = 60 * 60 * 8;

function getRequiredEnv(name: "ADMIN_PASSWORD" | "ADMIN_SESSION_SECRET") {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

function equalValues(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function sign(expiresAt: string) {
  return createHmac("sha256", getRequiredEnv("ADMIN_SESSION_SECRET"))
    .update(expiresAt)
    .digest("hex");
}

export function isCorrectAdminPassword(password: string) {
  return equalValues(password, getRequiredEnv("ADMIN_PASSWORD"));
}

export async function createAdminSession() {
  const expiresAt = String(Date.now() + ADMIN_SESSION_SECONDS * 1000);
  const token = `${expiresAt}.${sign(expiresAt)}`;

  (await cookies()).set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    maxAge: ADMIN_SESSION_SECONDS,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function removeAdminSession() {
  (await cookies()).delete(ADMIN_SESSION_COOKIE);
}

export async function hasAdminSession() {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    return false;
  }

  const [expiresAt, signature] = token.split(".");

  if (!expiresAt || !signature || Number(expiresAt) <= Date.now()) {
    return false;
  }

  return equalValues(signature, sign(expiresAt));
}
