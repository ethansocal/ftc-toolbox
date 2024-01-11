import authConfig from "@/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const isLoggedin = req.auth?.user;
    console.log(isLoggedin);
    if (req.nextUrl.pathname.startsWith("/api")) {
        console.log("APII");
    }
});
