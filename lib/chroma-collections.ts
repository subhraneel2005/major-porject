import { chroma, COLLECTION_NAME } from "@/config/chroma";

let collection: any;

export async function getCollection() {
  if (!collection) {
    collection = await chroma.getOrCreateCollection({
      name: COLLECTION_NAME,
    });
  }
  return collection;
}