import OpenAI from "openai";
import { experimental_AssistantResponse } from "ai";

import type, { NextResponse } from "next/server";
// import { addMessage, createChat, getChats } from "@/lib/chat/db-actions";
import { MessageContentText } from "openai/resources/beta/threads/messages/messages";
import { createThread } from "./createThread";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
    const input: {
        threadId: string | null;
        message: string;
    } = await req.json();


    // Create a thread if one doesn't exist
    if(!input.threadId) {
        input.threadId = await createThread();
    }
    
    const threadId = input.threadId!;

    const createdMessage = await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: input.message,
    });

    return experimental_AssistantResponse(
        { threadId, messageId: createdMessage.id },
        async ({ threadId, sendMessage, sendDataMessage }) => {
            // Run the assistant on the thread
            const run = await openai.beta.threads.runs.create(threadId, {
                assistant_id:
                    process.env.ASSISTANT_ID ??
                    (() => {
                        throw new Error("ASSISTANT_ID is not set");
                    })(),
            });

            async function waitForRun(run: OpenAI.Beta.Threads.Runs.Run) {
                // Poll for status change
                while (
                    run.status === "queued" ||
                    run.status === "in_progress"
                ) {
                    // delay for 500ms:
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    run = await openai.beta.threads.runs.retrieve(
                        threadId!,
                        run.id,
                    );
                }

                // Check the run status
                if (
                    run.status === "cancelled" ||
                    run.status === "cancelling" ||
                    run.status === "failed" ||
                    run.status === "expired"
                ) {
                    throw new Error(run.status);
                }
            }

            await waitForRun(run);

            // Get new thread messages (after our message)
            const responseMessages = (
                await openai.beta.threads.messages.list(threadId, {
                    after: createdMessage.id,
                    order: "asc",
                })
            ).data;

            // Send the messages
            for (const message of responseMessages) {
                sendMessage({
                    id: message.id,
                    role: "assistant",
                    content: message.content.filter(
                        (content) => content.type === "text",
                    ) as Array<MessageContentText>,
                });
            }
        },
    );

    // const { user } = session;

    // Create a chat if one doesn't exist
    // if (messages.length == 1) {
    //     //TODO: Generate the title using GPT-3
    //     const title = messages[0].content.split(" ").slice(0, 3).join(" ");

    //     await createChat({ id, title, userId: user.id });
    // }

    // // Add the user's message to the chat
    // const userMessage = messages[messages.length - 1];
    // await addMessage({
    //     ...userMessage,
    //     chatId: id,
    // });
}

/*
 * GET /api/chat
 *
 * Returns all chats for the authenticated user
 */
export async function GET() {
    return NextResponse.json({ error: "Not Implemented" }, { status: 500 });
}