import { pipeline, env } from "@xenova/transformers";

// CRITICAL: Disable browser-only features in a Node.js environment
// This prevents the "blob:nodedata" and "DefaultLogger" errors
env.allowRemoteModels = true;
env.backends.onnx.wasm.proxy = false;   // Stops trying to use Web Workers
env.backends.onnx.wasm.numThreads = 1;  // Ensures stability on reloads

let embedder: any = null;

export async function getEmbedder() {
  if (!embedder) {
    try {
      embedder = await pipeline(
        "feature-extraction",
        "Xenova/all-MiniLM-L6-v2",
      );
    } catch (error) {
      console.error("Critical: Model Initialization Failed:", error);
      throw error;
    }
  }
  return embedder;
}

export async function embedTexts(texts: string[]) {
  const model = await getEmbedder();
  const embeddings = [];

  for (const text of texts) {
    // Standardizing the output for ChromaDB
    const output = await model(text, { pooling: "mean", normalize: true });
    embeddings.push(Array.from(output.data));
  }

  return embeddings;
}