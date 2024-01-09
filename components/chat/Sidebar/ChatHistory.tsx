"use client";

import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { cn } from "@/lib/utils";

interface ChatProps {
    id: string;
    title: string;
    createdAt: Date;
    userId: number;
}

export default () => {
    const { data, error, isLoading } = useSWR("/api/chat", fetcher);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <li>
                <div className="text-xs font-semibold  text-gray-400">
                    Chat History
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {data.chats?.map((chat: ChatProps) => (
                        <li key={chat.id}>
                            <a
                                href={`/chat/${chat.id}`}
                                className={cn(
                                    // team.current
                                    //   ? "bg-gray-800 text-white"
                                    //   : "text-gray-400 hover:text-white hover:bg-gray-800",
                                    "text-gray-400 hover:text-white hover:bg-gray-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-normal",
                                )}
                            >
                                <div className="flex justify-center items-center">
                                    <ChatBubbleBottomCenterIcon className="flext h-4 w-4 mr-2" />
                                    <span className="truncate">
                                        {chat.title}
                                    </span>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </li>
        </>
    );
};
