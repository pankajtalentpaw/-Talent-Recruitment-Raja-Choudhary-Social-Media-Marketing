import { MongoClient } from "mongodb";

const databaseName = process.env.MONGODB_DB || "raja_recruitment";
let clientPromise: Promise<MongoClient> | undefined;

declare global {
  var rajaMongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  return new MongoClient(uri).connect();
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
