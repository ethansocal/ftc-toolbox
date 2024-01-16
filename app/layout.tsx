import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { type ReactNode } from "react";

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
                <main className="min-h-screen flex flex-col items-center">
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
