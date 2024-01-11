import Discord from "next-auth/providers/discord";

import type { NextAuthConfig } from "next-auth";

export default {
    providers: [
        Discord({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
        }),
    ],
} satisfies NextAuthConfig;
