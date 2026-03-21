import { pipeline } from "@xenova/transformers";

let embedder: any;

export async function getEmbedder() {
  if (!embedder) {
    embedder = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }
  return embedder;
}

export async function embedTexts(texts: string[]) {
  const model = await getEmbedder();

  const embeddings = [];

  for (const text of texts) {
    const output = await model(text, { pooling: "mean", normalize: true });
    embeddings.push(Array.from(output.data));
  }

  return embeddings;
}