"use client";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AILogo from "@/logo.png";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Message, experimental_useAssistant as useAssistant } from "ai/react";

import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";

export default () => {
    const userImage = "https://github.com/suleymanefe.png";
    const { status, messages, input, submitMessage, handleInputChange, error } =
        useAssistant({
            api: "/api/chat",
        });

    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [avatar_url, setAvatarUrl] = useState(null);

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                throw error;
            }

            if (data) {
                setAvatarUrl(data.user.user_metadata.avatar_url);
                console.log(data.user);
            }
        } catch (error) {
            alert("Error loading user data!");
        } finally {
            setLoading(false);
        }
    }, [supabase]);

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    return (
        <div className="flex flex-col h-screen">
            <ScrollArea className="flex rounded-md w-screen flex-grow justify-center pt-5">
                <div className="container mx-auto md:w-9/12 lg:w-5/12">
                    {messages.map((message: Message, k) => {
                        const isUser = message.role === "user";
                        return (
                            <div className="p-2" key={k}>
                                <div className="flex items-center">
                                    <Avatar className="w-6 h-6">
                                        <AvatarImage
                                            src={
                                                isUser
                                                    ? avatar_url!
                                                    : AILogo.src
                                            }
                                            alt="Profile Picture"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>

                                    <text className="font-bold pl-2">
                                        {isUser ? "You" : "Centerstage AI"}
                                    </text>
                                </div>

                                <div className="flex justify-start px-8">
                                    <text className="font-extralight leading-relaxed whitespace-pre-wrap">
                                        {message.content
                                            .split("\n")
                                            .map((i) => i.trim())
                                            .join("\n")}
                                    </text>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </ScrollArea>

            <form
                className="flex container rounded-md border mb-4 p-2 w-4/5 md:w-9/12 lg:w-5/12"
                onSubmit={submitMessage}
            >
                <Input
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 basis-4/5 sm:basis-11/12"
                    placeholder="Message Centerstage AI..."
                    onChange={handleInputChange}
                    value={input}
                />
                <Button size="icon" className="ml-auto">
                    <PaperPlaneIcon />
                </Button>
            </form>
        </div>
    );
};
