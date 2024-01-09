// import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

import { getServerSession } from "next-auth/next";
import type, { NextRequest, NextResponse } from "next/server";
import { addMessage, createChat, getChats } from "@/lib/chat/db-actions";

import authOptions from "../auth/[...nextauth]/authOptions";

import { ChatOpenAI } from "@langchain/openai";
import { OpenAI } from "langchain/llms/openai";

import { PrismaVectorStore } from "@langchain/community/vectorstores/prisma";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PrismaClient, Prisma, Document } from "@prisma/client";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { MultiQueryRetriever } from "langchain/retrievers/multi_query";
import { formatDocumentsAsString } from "langchain/util/document";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { ParentDocumentRetriever } from "langchain/retrievers/parent_document";

const model = new OpenAI({
  modelName: "gpt-4",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const loader = new DirectoryLoader("documents", {
  ".json": (path) => new JSONLoader(path, "/text"),
  ".pdf": (path) =>
    new PDFLoader(path, { parsedItemSeparator: "", splitPages: false }),
});

const db = new PrismaClient();
const vectorStore = PrismaVectorStore.withModel<Document>(db).create(
  new OpenAIEmbeddings(),
  {
    prisma: Prisma,
    tableName: "Document",
    vectorColumnName: "vector",
    columns: {
      id: PrismaVectorStore.IdColumn,
      content: PrismaVectorStore.ContentColumn,
    },
  }
);

const chatModel = new ChatOpenAI({});
const outputParser = new StringOutputParser();

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `Answer the following question based only on the provided context:

  <context>
  {context}
  </context>
  `,
  ],
  ["user", "{input}"],
]);

const chain = prompt.pipe(chatModel).pipe(outputParser);

export async function POST(req: NextRequest) {
    const json = await req.json();
    const { messages, id } = json;

  const retriever = MultiQueryRetriever.fromLLM({
    llm: model,
    // @ts-ignore
    retriever: vectorStore.asRetriever(),
    verbose: true,
  });

  // messages[messages.length - 1].content
  const query = "What are mitochondria made of?";
  const retrievedDocs = await retriever.getRelevantDocuments(query);
  console.log(retrievedDocs);

  // const result = await chain.invoke({
  //   input: "what is LangSmith?",
  // });
  // console.log(result);
  return;
  const session = await getServerSession(authOptions);

    //TODO: Add a trial mode for authenticated users
    if (!session) {
        return NextResponse.json(
            { error: "Not authenticated" },
            { status: 401 },
        );
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

  // const stream = OpenAIStream(response, {
  //   async onCompletion(completion) {
  //     await addMessage({
  //       content: completion,
  //       role: "assistant",
  //       chatId: id,
  //     });
  //   },
  // });

  // return new StreamingTextResponse(stream);
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
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 },
            );
        }

        const { user } = session;

        const chats = await getChats(user.id);

        return NextResponse.json({ chats });
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
