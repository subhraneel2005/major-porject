import { CloudClient } from "chromadb";

export const chroma = new CloudClient({
  apiKey: process.env.CHROMA_API_KEY,
  tenant: process.env.CHROMA_TENANT,
  database: process.env.CHROMA_DATABASE,
});

export const COLLECTION_NAME = "rag_docs";