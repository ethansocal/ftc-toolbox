import OpenAI from "openai";
import { experimental_AssistantResponse } from "ai";

import type, { NextResponse } from "next/server";
import { MessageContentText } from "openai/resources/beta/threads/messages/messages";
import { createThread } from "./createThread";
import { insertMessageToDB } from "./insertMessageToDB";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
    const input: {
        threadId: string | null;
        message: string;
    } = await req.json();

    if (!input.threadId) {
        input.threadId = (await createThread()) as string;
    }

    const threadId = input.threadId!;

    const createdMessage = await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: input.message,
    });


    // await insertMessageToDB(threadId, createdMessage);

    return experimental_AssistantResponse(
        { threadId, messageId: createdMessage.id },
        async ({ threadId, sendMessage, sendDataMessage }) => {
            const run = await openai.beta.threads.runs.create(threadId, {
                assistant_id:
                    process.env.ASSISTANT_ID ??
                    (() => {
                        throw new Error("ASSISTANT_ID is not set");
                    })(),
            });

            async function waitForRun(run: OpenAI.Beta.Threads.Runs.Run) {
                while (
                    run.status === "queued" ||
                    run.status === "in_progress"
                ) {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    run = await openai.beta.threads.runs.retrieve(
                        threadId!,
                        run.id,
                    );
                }

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

            const responseMessages = (
                await openai.beta.threads.messages.list(threadId, {
                    after: createdMessage.id,
                    order: "asc",
                })
            ).data;

            for (const message of responseMessages) {
                // TODO: Will be included in the next release
                // await insertMessageToDB(threadId, message);
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
}

/*
 * GET /api/chat
 *
 * Returns all chats for the authenticated user
 */
export async function GET() {
    return NextResponse.json({ error: "Not Implemented" }, { status: 500 });
}
