import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/api")) {
        // const session = await getServerSession(authOptions);
        // console.log(session);
        console.log("APII");
    }

    //   if (request.nextUrl.pathname.startsWith('/dashboard')) {
    //     return NextResponse.rewrite(new URL('/dashboard/user', request.url))
    //   }
}
