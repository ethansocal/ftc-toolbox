"use client";

import { useCallback, useEffect, useState } from "react";

import AILogo from "@/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { createClient } from "@/utils/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message, experimental_useAssistant as useAssistant } from "ai/react";

import MessageSkeleton from "./MessageSkeleton";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { CodeBlock } from "./Codeblock";
import { MemoizedReactMarkdown } from "./Markdown";

const aaa =
    'Absolutely! 😄 If you\'re looking to program a servo in Java for the FTC competition, here\'s a basic example that demonstrates how to set the position of a servo using the FTC SDK:\n\n```java\npackage org.firstinspires.ftc.teamcode;\n\nimport com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;\nimport com.qualcomm.robotcore.eventloop.opmode.TeleOp;\nimport com.qualcomm.robotcore.hardware.Servo;\n\n@TeleOp(name = "SimpleServoExample", group = "Examples")\npublic class SimpleServoExample extends LinearOpMode {\n\n    // Define the servo variable\n    private Servo myServo;\n\n    @Override\n    public void runOpMode() {\n\n        // Initialize the servo from the hardwareMap using the name given in the robot configuration\n        myServo = hardwareMap.get(Servo.class, "myServo");\n\n        // Wait for the driver to press PLAY\n        waitForStart();\n\n        while (opModeIsActive()) {\n            \n            // If the X button is pressed on gamepad1, set the servo to one position\n            if (gamepad1.x) {\n                myServo.setPosition(0.0); // all the way in one direction\n            }\n\n            // If the B button is pressed on gamepad1, set the servo to another position\n            if (gamepad1.b) {\n                myServo.setPosition(1.0); // all the way in the other direction\n            }\n\n            // Send telemetry message to signify robot running and the servo position\n            telemetry.addData("Servo Position", myServo.getPosition());\n            telemetry.update();\n        }\n    }\n}\n```\n\nIn this code snippet:\n- We start by importing the necessary classes and then declare the `SimpleServoExample` class extending the `LinearOpMode`.\n- Within the class, we declare a `Servo` object named `myServo`.\n- Inside the `runOpMode` method, we initialize `myServo` using the name you\'ve configured in the FTC Robot Controller app\'s configuration. For this code, the name is `"myServo"`.\n- After initializing the servo, we enter a loop that will continue to run as long as the Op Mode is active (`opModeIsActive()`).\n- In the loop, we check if the X or B button on `gamepad1` is pressed, and set the servo to the corresponding position. The `setPosition` method\'s value ranges from 0.0 to 1.0, where 0.0 is one extreme of the servo\'s movement range and 1.0 is the other.\n- We constantly update telemetry with the current servo position.\n\nRemember to change `"myServo"` to the name used in your configuration. This example uses gamepad buttons to move the servo to the extreme positions - you can modify these positions and gamepad controls according to your robotic system design and requirements.\n\nHave a fantastic time coding your robot for the Centerstage challenge! 🎮';

export default () => {
    const { status, messages, input, submitMessage, handleInputChange, error } =
        useAssistant({
            api: "/api/chat",
        });

    console.log(status);
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
            }
        } catch (error) {
            console.log(error);
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
                <div className="container mx-auto md:w-9/12 lg:w-5/12 md:max-w-9/12 lg:max-w-5/12">
                    <div className="flex px-8">
                        <MemoizedReactMarkdown
                            className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 font-extralight leading-relaxed"
                            remarkPlugins={[remarkGfm, remarkMath]}
                            components={{
                                //@ts-ignore
                                p({ children }: { children: React.ReactNode }) {
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
                                    const match = /language-(\w+)/.exec(
                                        className || "",
                                    );

                                    return match ? (
                                        <CodeBlock
                                            key={Math.random()}
                                            language={(match && match[1]) || ""}
                                            value={String(children).replace(
                                                /\n$/,
                                                "",
                                            )}
                                            {...props}
                                        />
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                },
                            }}
                        >
                            {aaa}
                        </MemoizedReactMarkdown>
                    </div>
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

                                <div className="flex px-8">
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
                                        {aaa}
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
