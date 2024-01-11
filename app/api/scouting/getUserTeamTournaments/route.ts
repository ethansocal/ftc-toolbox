import { NextRequest, NextResponse } from "next/server";
import getCurrentTournament from "@/app/api/scouting/currentTournament/getCurrentTournament";
import getTeamTournaments from "@/lib/getTeamTournaments";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";

export const GET = async (req: NextRequest) => {
    const session = await auth();
    if (!session) {
        return NextResponse.error();
    }
    const teamMember = await prisma.teamMember.findUniqueOrThrow({
        where: {
            userId: session.user.id,
        },
        include: {
            team: {
                select: {
                    number: true,
                },
            },
        },
    });
    return NextResponse.json(
        await getTeamTournaments(teamMember.team.number.toString()),
    );
};
