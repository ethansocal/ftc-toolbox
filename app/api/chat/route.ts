import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

import { getServerSession } from "next-auth/next";
import type, { NextRequest, NextResponse } from "next/server";
import { addMessage, createChat, getChats } from "@/lib/chat/db-actions";

import authOptions from "../auth/[...nextauth]/authOptions";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const json = await req.json();
  const { messages, id } = json;

  const session = await getServerSession(authOptions);

  //TODO: Add a trial mode for authenticated users
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { user } = session;

  // Create a chat if one doesn't exist
  if (messages.length == 1) {
    //TODO: Generate the title using GPT-3
    const title = messages[0].content.split(" ").slice(0, 3).join(" ");

    await createChat({ id, title, userId: user.id });
  }

  // Add the user's message to the chat
  const userMessage = messages[messages.length - 1];
  await addMessage({
    ...userMessage,
    chatId: id,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages,
    temperature: 0.7,
    stream: true,
  });

  const stream = OpenAIStream(response, {
    async onCompletion(completion) {
      await addMessage({
        content: completion,
        role: "assistant",
        chatId: id,
      });
    },
  });

  return new StreamingTextResponse(stream);
}

/*
 * GET /api/chat
 *
 * Returns all chats for the authenticated user
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { user } = session;

    const chats = await getChats(user.id);

    return NextResponse.json({ chats });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
