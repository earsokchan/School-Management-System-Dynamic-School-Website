import { academicPrograms } from "@/data/programs";
import { events } from "@/data/events";
import { gallery } from "@/data/gallery";
import { news } from "@/data/news";
import { studentResults } from "@/data/results";
import { teachers } from "@/data/teachers";
import { revalidatePublicContent, type CollectionName } from "@/lib/server/collections";
import { getDatabase } from "@/lib/server/mongodb";

const seedCollections: Partial<Record<CollectionName, readonly object[]>> = {
  news,
  events,
  gallery,
  "academic-programs": academicPrograms,
  "public-teachers": teachers,
  "public-results": studentResults,
};

export async function seedPublicCollections(): Promise<Record<string, number>> {
  const database = await getDatabase();
  const result: Record<string, number> = {};

  for (const [name, records] of Object.entries(seedCollections) as [CollectionName, readonly object[]][]) {
    if (!records) continue;
    const operations = records.map((record) => {
      const values = { ...(record as Record<string, unknown>) };
      const id = typeof values.id === "string" ? values.id : String(values.id);
      return {
        updateOne: {
          filter: { id },
          update: { $set: values },
          upsert: true,
        },
      };
    });
    const outcome = await database.collection(name).bulkWrite(operations, { ordered: false });
    result[name] = outcome.upsertedCount + outcome.modifiedCount;
    revalidatePublicContent(name);
  }

  return result;
}
