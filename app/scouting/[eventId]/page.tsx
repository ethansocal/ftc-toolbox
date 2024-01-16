import React from "react";
import { getSchedule } from "@/utils/ftc/getSchedule";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

async function Page({ params }: { params: { eventId: string } }) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
        data: { user },
    } = await supabase.auth.getUser();

    async function submitTeamNumber(formData: FormData) {
        "use server";

        const teamNumber = formData.get("teamNumber");
        if (
            teamNumber == null ||
            isNaN(parseInt(teamNumber.toString())) ||
            parseInt(teamNumber.toString()) < 0
        ) {
            return redirect("/scouting?message=Invalid team number");
        }
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);
        await supabase.auth.updateUser({
            data: { teamNumber: formData.get("teamNumber") },
        });
        revalidatePath("/scouting/[eventId]");
    }

    if (user == null) {
        return <div>Not logged in</div>;
    }
    if (!user.user_metadata.teamNumber) {
        return (
            <form action={submitTeamNumber}>
                Please enter your team number:
                <Input type="number" name={"teamNumber"} />
                <Button>Submit</Button>
            </form>
        );
    }

    const schedule = await getSchedule(params.eventId);
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Match</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Red Team</TableHead>
                        <TableHead>Blue Team</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {schedule.data.schedule!.map((match) => (
                        <TableRow key={match.matchNumber}>
                            <TableCell>{match.matchNumber}</TableCell>
                            <TableCell>
                                {match.scoreRedFinal} - {match.scoreBlueFinal}
                            </TableCell>
                            <TableCell>
                                {
                                    match.teams!.find(
                                        (i) => i.station === "Red1",
                                    )!.teamName
                                }
                                {" & "}
                                {
                                    match.teams!.find(
                                        (i) => i.station === "Red2",
                                    )!.teamName
                                }
                            </TableCell>
                            <TableCell>
                                {
                                    match.teams!.find(
                                        (i) => i.station === "Blue1",
                                    )!.teamName
                                }
                                {" & "}
                                {
                                    match.teams!.find(
                                        (i) => i.station === "Blue2",
                                    )!.teamName
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default Page;
