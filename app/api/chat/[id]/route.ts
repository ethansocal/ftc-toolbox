import { NextResponse } from "next/server";
import { Request } from "express";
import { getChat } from "@/lib/chat/db-actions";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const chat = await getChat(params.id);

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    return NextResponse.json({ chat });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
