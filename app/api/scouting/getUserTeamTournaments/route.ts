import { NextRequest, NextResponse } from "next/server";
import getCurrentTournament from "@/app/api/scouting/currentTournament/getCurrentTournament";
import getTeamTournaments from "@/lib/getTeamTournaments";
import { getServerSession } from "next-auth/next";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/db";

export const GET = async (req: NextRequest) => {
    const session = await getServerSession(authOptions);
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
