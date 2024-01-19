"use client";

import AILogo from "@/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message, experimental_useAssistant as useAssistant } from "ai/react";

import MessageSkeleton from "./MessageSkeleton";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { CodeBlock } from "./Codeblock";
import { MemoizedReactMarkdown } from "./Markdown";

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
    return (
        <div className="flex flex-col h-screen">
            <ScrollArea className="flex rounded-md w-screen flex-grow justify-center pt-5">
                <div className="container mx-auto md:w-9/12 lg:w-5/12">
                    {messages.map((message: Message, k: number) => {
                        const isUser = message.role === "user";
                        return (
                            <div className="p-2" key={k}>
                                <div className="flex items-center">
                                    <Avatar className="w-6 h-6">
                                        <AvatarImage
                                            src={
                                                isUser
                                                    ? user?.avatar_url!
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

                                <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
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
