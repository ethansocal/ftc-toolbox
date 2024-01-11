"use client";

import { Message, experimental_useAssistant as useAssistant } from "ai/react";

import { toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import ChatInput from "./ChatInput";
import ChatList from "./ChatList";
import EmptyScreen from "./EmptyScreen";

const roleToColorMap: Record<Message["role"], string> = {
    system: "red",
    user: "black",
    function: "blue",
    assistant: "green",
    data: "orange",
};

export interface ChatProps {
    initialMessages?: Message[];
    id?: string;
}

export default ({ id, initialMessages }: ChatProps) => {
    const router = useRouter();
    const path = usePathname();

    const { status, messages, input, submitMessage, handleInputChange, error } =
        useAssistant({
            api: "/api/chat",
        });

    console.log(messages, status, error);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (status === "awaiting_message") {
            inputRef.current?.focus();
        }
    }, [status]);

    return (
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
            {error != null && (
                <div className="relative bg-red-500 text-white px-6 py-4 rounded-md">
                    <span className="block sm:inline">
                        Error: {(error as any).toString()}
                    </span>
                </div>
            )}

            {messages.map((m: Message) => (
                <div
                    key={m.id}
                    className="whitespace-pre-wrap text-white"
                    style={{ color: roleToColorMap[m.role] }}
                >
                    <strong>{`${m.role}: `}</strong>
                    {m.role !== "data" && m.content}
                    {m.role === "data" && (
                        <>
                            {(m.data as any).description}
                            <br />
                            <pre className={"bg-gray-200"}>
                                {JSON.stringify(m.data, null, 2)}
                            </pre>
                        </>
                    )}
                    <br />
                    <br />
                </div>
            ))}

            {status === "in_progress" && (
                <div className="h-8 w-full max-w-md p-2 mb-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
            )}

            <form onSubmit={submitMessage}>
                <input
                    ref={inputRef}
                    disabled={status !== "awaiting_message"}
                    className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl text-black"
                    value={input}
                    placeholder="What is the temperature in the living room?"
                    onChange={handleInputChange}
                />
            </form>
        </div>
    );
};
