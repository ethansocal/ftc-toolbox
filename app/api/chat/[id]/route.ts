import { NextResponse } from "next/server";
import { Request } from "express";
import { getChat } from "@/lib/chat/db-actions";
import { auth } from "@/lib/auth";

export async function GET(
    req: Request,
    { params }: { params: { id: string } },
) {
    try {
        const session = await auth();
        const chat = await getChat(params.id);

        if (!chat) {
            return NextResponse.json({ status: 404 });
        }

        if (chat.userId !== session?.user?.id) {
            return NextResponse.json({ status: 401 });
        }

        return NextResponse.json({ chat });
    } catch (error) {
        return NextResponse.json({ status: 500 });
    }
}
