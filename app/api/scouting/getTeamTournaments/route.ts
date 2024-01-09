import { NextRequest, NextResponse } from "next/server";
import getCurrentTournament from "@/app/api/scouting/currentTournament/getCurrentTournament";
import getTeamTournaments from "@/lib/getTeamTournaments";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const teamNumber = url.searchParams.get("team");
    if (teamNumber === null)
        return NextResponse.json(
            { error: "Missing team number" },
            { status: 400 },
        );
    return NextResponse.json(await getTeamTournaments(teamNumber));
}
