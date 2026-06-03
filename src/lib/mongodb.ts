import { MongoClient } from "mongodb";

const databaseName = process.env.MONGODB_DB || "raja_recruitment";
let clientPromise: Promise<MongoClient> | undefined;

export class DatabaseConfigurationError extends Error {
  constructor() {
    super("MONGODB_URI is not configured.");
    this.name = "DatabaseConfigurationError";
  }
}

declare global {
  var rajaMongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI?.trim();

  if (!uri) {
    throw new DatabaseConfigurationError();
  }

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,  // fail fast — Vercel functions timeout at 10s
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    minPoolSize: 0,                  // allow pool to scale to 0 between serverless invocations
    retryWrites: true,
    retryReads: true,
  });

  const promise = client.connect();

  // Critical fix: clear the cached promise on failure so the NEXT request
  // retries the connection instead of instantly returning the cached rejection.
  promise.catch(() => {
    if (process.env.NODE_ENV === "development") {
      global.rajaMongoClientPromise = undefined;
    } else {
      clientPromise = undefined;
    }
  });

  return promise;
}

function getClientPromise(): Promise<MongoClient> {
  if (process.env.NODE_ENV === "development") {
    global.rajaMongoClientPromise ??= createClientPromise();
    return global.rajaMongoClientPromise;
  }

  clientPromise ??= createClientPromise();
  return clientPromise;
}

export async function getDatabase() {
  const client = await getClientPromise();
  return client.db(databaseName);
}
