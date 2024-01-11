import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/db";
import authConfig from "@/auth.config";

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    secret: process.env.AUTH_SECRET,
    ...authConfig,
});
