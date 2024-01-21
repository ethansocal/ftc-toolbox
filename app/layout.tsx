import { type ReactNode } from "react";

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import Icon from "@/public/logo.svg";
import { GeistSans } from "geist/font/sans";
import { Button } from "@/components/ui/button";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: "FTC Toolbox",
    description:
        "The fastest way to get ahead of other teams with AI tools and scouting.",
    openGraph: {
        images: ["/cover_image.png"],
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={GeistSans.className}>
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
                ></meta>
            </head>

            <body className="bg-background text-foreground">
                <header className="flex flex-col items-center justify-center w-full py-3 px-4 fixed top-0 border-b border-gray-900">
                    <div className="flex flex-row items-center justify-between w-full h-full">
                        <Link
                            href="/"
                            className={"flex flex-row items-center gap-1"}
                        >
                            <Image
                                src={Icon}
                                alt="FTC Toolbox Logo"
                                width={40}
                                height={40}
                            />
                            <h1 className="text-3xl font-bold">
                                FTC{" "}
                                <span style={{ color: "#FF4848" }}>
                                    Toolbox
                                </span>
                            </h1>
                        </Link>
                        <div className={"flex flex-row items-center"}>
                            <Button size={"icon"} variant={"ghost"}>
                                <Link
                                    href="https://github.com/ethansocal/ftc-toolbox"
                                    target="_blank"
                                >
                                    <GitHubLogoIcon className={"h-6 w-6"} />
                                </Link>
                            </Button>
                            <Button size={"icon"} variant={"ghost"}>
                                <Link
                                    href="https://discord.gg/ucrrz2K6Yd"
                                    target="_blank"
                                >
                                    <DiscordLogoIcon className={"h-6 w-6"} />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </header>

                <main className="flex flex-col items-center mt-16">
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}

                        <GoogleAnalytics gaId="G-17D5533R47" />
                        <Analytics />
                        <SpeedInsights />
                    </ThemeProvider>
                </main>
            </body>
        </html>
    );
}
