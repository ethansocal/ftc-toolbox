"use client";

import Chat from "@/components/chat/";
import { notFound } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";

export interface ChatPageProps {
    params: {
        id: string;
    };
}

export default ({ params }: ChatPageProps) => {
    //TODO: Add user authentication
    const { data, error, isLoading } = useSWR(
        `/api/chat/${params.id}`,
        fetcher,
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data?.chat && !isLoading) {
        return notFound();
    }
    console.log(data?.chat.messages);
    return <Chat id={params.id} initialMessages={data.chat.messages} />;
};
