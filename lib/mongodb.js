import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "nexacore";

let clientPromise;

if (!uri) {
  // Thrown lazily (only when a route actually tries to connect), so the app
  // still builds/runs without a database configured.
  clientPromise = Promise.reject(
    new Error("MONGODB_URI is not set. Add it to .env.local (see .env.example).")
  );
} else if (process.env.NODE_ENV === "development") {
  // Reuse the same connection across hot-reloads in dev instead of opening a new one per edit.
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri).connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = new MongoClient(uri).connect();
}

export async function getDb() {
  const client = await clientPromise;
  return client.db(dbName);
}
