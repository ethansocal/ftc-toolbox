import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/db";

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    providers: [
        Discord({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
        }),
    ],
    secret: process.env.TOKEN_SECRET,
    adapter: PrismaAdapter(db),
    // callbacks: {
    //     jwt({ token, account, user }) {
    //         if (account) {
    //             token.accessToken = account.access_token;
    //             token.id = user?.id;
    //         }
    //         return token;
    //     },
    //     session({ session, token }) {
    //         if (token?.id) {
    //             session.user.id = token.id;
    //         }
    //
    //         return session;
    //     },
    // },
});
