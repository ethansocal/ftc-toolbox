"use client";

import { useChat, type Message } from "ai/react";
import { toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

import ChatInput from "./ChatInput";
import ChatList from "./ChatList";
import EmptyScreen from "./EmptyScreen";

export interface ChatProps {
    initialMessages?: Message[];
    id?: string;
}

export default ({ id, initialMessages }: ChatProps) => {
    const router = useRouter();
    const path = usePathname();

    const { messages, append, reload, stop, isLoading, input, setInput } =
        useChat({
            initialMessages,
            id,
            body: {
                id,
            },
            onResponse(response) {
                if (response.status === 401) {
                    toast.error(response.statusText);
                }
            },
            onFinish() {
                if (path == "/chat") {
                    router.push(`/chat/${id}`, { scroll: false });
                    router.refresh();
                }
            },
        });

    return (
        <div className="flex flex-col justify-center">
            <div className="overflow-y-auto mt-5 h-screen w-[600px]">
                {messages.length ? (
                    <ChatList messages={messages} />
                ) : (
                    <EmptyScreen />
                )}
            </div>

            <div className="mb-5">
                <ChatInput
                    id={id}
                    isLoading={isLoading}
                    stop={stop}
                    append={append}
                    reload={reload}
                    messages={messages}
                    input={input}
                    setInput={setInput}
                />
            </div>
        </div>
    );
};
