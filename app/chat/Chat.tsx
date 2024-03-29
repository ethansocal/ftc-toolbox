"use client";

import AILogo from "@/public/logo.png";
import UserLogo from "@/public/user_profile.png";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message, experimental_useAssistant as useAssistant } from "ai/react";

import { useEffect, useState } from "react";
import MessageSkeleton from "./MessageSkeleton";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { CodeBlock } from "./Codeblock";
import { MemoizedReactMarkdown } from "./Markdown";
import Link from "next/link";

const conversationStarters = [
    "What is an alliance marker?",
    "What are the dimension limits for the FTC robots?",
    "How can we earn the Set Bonus during a match?",
    "What is mosaic scoring and how it works?",
    "What is considered knocking down the pixels?",
];

export default ({
    messages,
    user,
    submitMessage,
    handleInputChange,
    input,
    status,
}: {
    messages: any;
    user: any;
    submitMessage: any;
    handleInputChange: any;
    input: any;
    status: any;
}) => {
    const [randomStarter, setRandomStarter] = useState("");

    useEffect(() => {
        const randomIndex = Math.floor(
            Math.random() * conversationStarters.length,
        );
        const selectedStarter = conversationStarters[randomIndex];
        setRandomStarter(selectedStarter);
    }, []);

    return (
        <div className="flex flex-col h-[calc(100dvh-4rem)]">
            <ScrollArea className="flex flex-grow w-screen justify-center mt-4">
                <div className="container mx-auto md:w-9/12 lg:w-5/12">
                    {messages.map((message: Message, k: number) => {
                        const isUser = message.role === "user";
                        return (
                            <div className="p-2 mb-3" key={k}>
                                <div className="flex items-center">
                                    <Avatar className="w-6 h-6">
                                        <AvatarImage
                                            src={
                                                isUser
                                                    ? UserLogo.src
                                                    : AILogo.src
                                            }
                                            alt="Profile Picture"
                                        />
                                        <AvatarFallback></AvatarFallback>
                                    </Avatar>

                                    <text className="font-bold pl-2">
                                        {isUser ? "You" : "Centerstage AI"}
                                    </text>
                                </div>

                                <div className="flex-1 px-1 ml-8 space-y-2 overflow-hidden">
                                    <MemoizedReactMarkdown
                                        className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 font-extralight leading-relaxed"
                                        remarkPlugins={[remarkGfm, remarkMath]}
                                        components={{
                                            //@ts-ignore
                                            p({
                                                children,
                                            }: {
                                                children: React.ReactNode;
                                            }) {
                                                return (
                                                    <p className="mb-2 last:mb-0">
                                                        {children}
                                                    </p>
                                                );
                                            },
                                            //@ts-ignore
                                            code({
                                                className,
                                                children,
                                                ...props
                                            }: {
                                                className: any;
                                                children: any;
                                                props: any;
                                            }) {
                                                const match =
                                                    /language-(\w+)/.exec(
                                                        className || "",
                                                    );

                                                return match ? (
                                                    <CodeBlock
                                                        key={Math.random()}
                                                        language={
                                                            (match &&
                                                                match[1]) ||
                                                            ""
                                                        }
                                                        value={String(
                                                            children,
                                                        ).replace(/\n$/, "")}
                                                        {...props}
                                                    />
                                                ) : (
                                                    <code
                                                        className={className}
                                                        {...props}
                                                    >
                                                        {children}
                                                    </code>
                                                );
                                            },
                                        }}
                                    >
                                        {message.content}
                                    </MemoizedReactMarkdown>
                                </div>
                            </div>
                        );
                    })}

                    {status == "in_progress" && <MessageSkeleton />}
                </div>
            </ScrollArea>

            {messages.length == 0 && (
                <div className="flex container justify-center mb-3 text-xs text-muted-foreground w-full">
                    <Button
                        className="mb-1"
                        variant="outline"
                        onClick={() => {
                            handleInputChange({
                                target: { value: randomStarter },
                            });
                        }}
                    >
                        {randomStarter}
                    </Button>
                </div>
            )}
            <form
                className="flex container rounded-md border mb-3 p-2 w-4/5 md:w-9/12 lg:w-5/12"
                onSubmit={(e) => {
                    e.preventDefault();

                    if (status !== "in_progress") {
                        submitMessage();
                    }
                }}
            >
                <Input
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 basis-4/5 sm:basis-11/12"
                    placeholder="Message Centerstage AI..."
                    onChange={handleInputChange}
                    value={input}
                />
                <Button
                    size="icon"
                    className="ml-auto"
                    disabled={status == "in_progress"}
                >
                    <PaperPlaneIcon />
                </Button>
            </form>
            <div className="flex container justify-center mb-3 text-xs text-muted-foreground">
                Centerstage AI is not always accurate. Double check important
                information.{" "}
                <Link
                    href="https://github.com/ethansocal/ftc-toolbox/issues"
                    target="_blank"
                    className="text-blue-500 ml-1"
                >
                    Issues?
                </Link>
            </div>
        </div>
    );
};
