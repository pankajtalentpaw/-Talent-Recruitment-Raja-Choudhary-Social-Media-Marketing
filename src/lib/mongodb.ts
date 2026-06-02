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

function createClientPromise() {
  const uri = process.env.MONGODB_URI?.trim();

  if (!uri) {
    throw new DatabaseConfigurationError();
  }

  return new MongoClient(uri, { serverSelectionTimeoutMS: 10000 }).connect();
}

function getClientPromise() {
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
