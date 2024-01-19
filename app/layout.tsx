import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { type ReactNode } from "react";
import Link from "next/link";
import Icon from "@/public/logo.svg";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "FTC Toolbox",
    description:
        "The fastest way to get ahead of other teams with AI tools and scouting.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={GeistSans.className}>
            <body className="bg-background text-foreground">
                <header className="flex flex-col items-center justify-center w-full py-3 px-4">
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
                        <Link href="https://github.com/">
                            <GitHubLogoIcon />
                        </Link>
                    </div>
                </header>

                <main className="flex flex-col items-center">
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </main>
            </body>
        </html>
    );
}
