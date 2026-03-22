import fs from "node:fs/promises";
import { parse } from "csv-parse/sync";
import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/chroma-collections";
import path from "node:path";
import { rowToSentence } from "@/lib/row-to-natural-language";

type MatchRow = {
  season: string;
  team1: string;
  team2: string;
  winner: string;
  player_of_match: string;
  venue: string;
  city: string;
};

export async function POST(req: NextRequest) {
  const filePath = path.join(process.cwd(), "cleaned_matches.csv");

  try {
    const file = await fs.readFile(filePath, "utf8");

    const rows = parse(file, {
      columns: true,
      skip_empty_lines: true,
    }) as MatchRow[];

    const collection = await getCollection();

    const seasonMap = new Map<string, MatchRow[]>();

    for (const row of rows) {
      if (!seasonMap.has(row.season)) {
        seasonMap.set(row.season, []);
      }
      seasonMap.get(row.season)!.push(row);
    }

    const ids: string[] = [];
    const documents: string[] = [];
    const metadatas = [];
    
    const CHUNK_SIZE = 20;
    
    for (const [season, matches] of seasonMap.entries()) {
      for (let i = 0; i < matches.length; i += CHUNK_SIZE) {
        const chunk = matches.slice(i, i + CHUNK_SIZE);
    
        const text = chunk.map(rowToSentence).join("\n");
    
        ids.push(`season-${season}-chunk-${i / CHUNK_SIZE}`);
    
        documents.push(`IPL Season ${season} matches:\n${text}`);
    
        metadatas.push({
          season,
          source: "cleaned_matches.csv",
          matches: chunk.length,
        });
      }
    }

    await collection.add({
      ids,
      documents,
      metadatas,
    });

    console.log(`Inserted ${documents.length} season documents`);

    return NextResponse.json(
      {
        success: true,
        message: "Ingestion successful",
        rows: rows.length,
        seasonsStored: documents.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error at ingestion:", error);

    return NextResponse.json(
      { success: false, message: "Ingestion failed" },
      { status: 500 }
    );
  }
}