import { NextResponse } from "next/server";
import { listTitles } from "@/lib/tmdb";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  try {
    const data = await listTitles({
      type: searchParams.get("type") || "movie",
      q: (searchParams.get("q") || "").trim(),
      page: searchParams.get("page") || 1,
    });
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
