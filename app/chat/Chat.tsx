"use client";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AILogo from "@/logo.png";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

const messages = [
    {
        role: "user",
        content:
            "Good morning! Can you give me an update on the latest in technology?",
    },
    {
        role: "assistant",
        content:
            "Good morning! Absolutely, the technology landscape is constantly evolving. One of the most exciting developments is in the realm of virtual reality, where we're seeing significant advancements in both hardware and software, creating more immersive and interactive experiences.",
    },
    {
        role: "user",
        content:
            "That's really interesting. What about advancements in artificial intelligence?",
    },
    {
        role: "assistant",
        content:
            "AI is progressing rapidly. From new language processing models that understand and generate human-like text, to AI being used in predictive analytics in industries like finance and healthcare, the potential is vast. Another area of interest is ethical AI, focusing on making AI decisions fair, transparent, and accountable.",
    },
    {
        role: "user",
        content:
            "Sounds complicated but fascinating. How is this technology being received in different industries?",
    },
    {
        role: "assistant",
        content:
            "There's a lot of enthusiasm across various sectors. In healthcare, AI is being used to personalize patient care and improve diagnostics. In finance, it's revolutionizing how we manage and predict financial trends. Even in creative industries, AI is being used to enhance art and music production. However, it's not without its challenges, particularly around privacy and job displacement concerns.",
    },
    {
        role: "user",
        content:
            "I can imagine the ethical implications are quite significant.",
    },
    {
        role: "assistant",
        content:
            "Indeed, ethical considerations are at the forefront of AI development. As we integrate AI more deeply into our daily lives, it's crucial to address issues such as data privacy, algorithmic bias, and the impact on employment. There's ongoing research and discussion about how to best navigate these challenges.",
    },
    {
        role: "user",
        content:
            "Switching gears, what's new in the world of renewable energy?",
    },
    {
        role: "assistant",
        content:
            "Renewable energy is experiencing a surge in innovation. We're seeing significant improvements in solar panel efficiency, development in wind turbine technology, and even advancements in harnessing energy from sources like ocean waves. Governments and private sectors are investing more in renewable energy, which is not only good for the environment but also increasingly becoming economically advantageous.",
    },
    {
        role: "user",
        content:
            "It's great to hear about these positive developments. Thanks for the comprehensive update!",
    },
    {
        role: "assistant",
        content:
            "You're welcome! If you have any more questions, whether it's about technology, science, or any other topic, feel free to ask. I'm here to help.",
    },
];

export default () => {
    const userImage = "https://github.com/suleymanefe.png";
    return (
        <div className="flex flex-col h-screen">
            <ScrollArea className="flex rounded-md w-screen flex-grow justify-center pt-5">
                <div className="container mx-auto md:w-9/12 lg:w-5/12">
                    {messages.map((message, k) => {
                        const isUser = message.role === "user";
                        return (
                            <div className="p-2" key={k}>
                                <div className="flex items-center">
                                    <Avatar className="w-6 h-6">
                                        <AvatarImage
                                            src={
                                                isUser ? userImage : AILogo.src
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
                                    <text className="font-extralight leading-relaxed">
                                        {message.content}
                                    </text>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </ScrollArea>

            <div className="flex container rounded-md border mb-4 p-2 w-4/5 md:w-9/12 lg:w-5/12">
                <Input
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 basis-4/5 sm:basis-11/12"
                    placeholder="Message Centerstage AI..."
                />
                <Button size="icon" className="ml-auto">
                    <PaperPlaneIcon />
                </Button>
            </div>
        </div>
    );
};
