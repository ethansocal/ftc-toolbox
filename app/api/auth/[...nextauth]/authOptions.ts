import { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const options: NextAuthOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        }),
    ],
};

export default options;
