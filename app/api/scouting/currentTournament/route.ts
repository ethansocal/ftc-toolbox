import { NextRequest, NextResponse } from "next/server";
import getCurrentTournament from "@/app/api/scouting/currentTournament/getCurrentTournament";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const teamNumber = url.searchParams.get("team");
    if (teamNumber === null)
        return NextResponse.json(
            { error: "Missing team number" },
            { status: 400 },
        );
    return NextResponse.json(getCurrentTournament(teamNumber));
}
