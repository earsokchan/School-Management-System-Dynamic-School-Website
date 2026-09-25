import { MongoClient } from "mongodb";
import { getMongoUri } from "@/lib/server/env";

const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
  mongoPromise?: Promise<MongoClient>;
};

export function getMongoClient(): Promise<MongoClient> {
  const uri = getMongoUri();
  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  if (!globalForMongo.mongoPromise) {
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    globalForMongo.mongoClient = client;
    globalForMongo.mongoPromise = client.connect().catch((error) => {
      globalForMongo.mongoClient = undefined;
      globalForMongo.mongoPromise = undefined;
      throw error;
    });
  }

  return globalForMongo.mongoPromise;
}

export async function getDatabase() {
  const client = await getMongoClient();
  return client.db();
}

export async function closeMongoClient(): Promise<void> {
  if (globalForMongo.mongoClient) {
    await globalForMongo.mongoClient.close();
  }
  globalForMongo.mongoClient = undefined;
  globalForMongo.mongoPromise = undefined;
}
