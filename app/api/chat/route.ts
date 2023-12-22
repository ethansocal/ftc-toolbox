import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import { createChat, addMessage, getChats } from "@/lib/chat/db-actions";
import { NextResponse } from "next/server";
import { getChat } from "@/lib/chat/db-actions";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const json = await req.json();
  const { messages, id } = json;

  // Create a chat if one doesn't exist
  if (messages.length === 1) {
    const title = messages[0].content.split(" ").slice(0, 3).join(" ");

    await createChat({ id, title, userId: 1 });
  }

  // Add the user's message to the chat
  const userMessage = messages[messages.length - 1];
  await addMessage({
    ...userMessage,
    chatId: id,
  });

  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.7,
    stream: true,
  });

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      // Add the assistant's message to the chat
      await addMessage({
        content: completion,
        role: "assistant",
        chatId: id,
      });
    },
  });

  return new StreamingTextResponse(stream);
}

export async function GET(req: Request) {
  try {
    //TODO: Add authentication
    const chats = await getChats(1);

    return NextResponse.json({ chats });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
