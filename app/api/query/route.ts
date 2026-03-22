import { NextRequest, NextResponse } from "next/server";
import { embed, generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getCollection } from "@/lib/chroma-collections";
import { embedTexts } from "@/lib/local-embed";

export async function POST(req: NextRequest) {
  const { userQuery } = await req.json();

  try {
    const collection = await getCollection();

    const [embedding] = await embedTexts([userQuery]);

    const results = await collection.query({
      queryEmbeddings: [embedding],
      nResults: 5,
    });

    console.log("chroma results:", results);

   const context = results.documents?.[0]?.join("\n") ?? "";

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: `
        You are an IPL data assistant.
        
        Context:
        ${context}
        
        Question:
        ${userQuery}
        
        Answer using only the context.
        `,
    });

    console.log("llm_answer: ", text)

    return NextResponse.json(
        {
            success: true,
            llm_answer: text
        },
        {
            status: 200
        }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
        {
            message: "Error at user query",
        },
        {
            status: 500
        }
    )
  }
}
