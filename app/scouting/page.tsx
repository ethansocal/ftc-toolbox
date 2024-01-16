import React from "react";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { getTeamTournaments } from "@/utils/ftc/getTeamTournaments";

async function Page() {
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
        revalidatePath("/scouting");
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
    const teamTournamentData = (
        await getTeamTournaments(user.user_metadata.teamNumber)
    ).data;
    return (
        <>
            {user.user_metadata.teamNumber && (
                <>
                    <div>Team Number: {user.user_metadata.teamNumber}</div>
                    <div>
                        Team Tournaments: {JSON.stringify(teamTournamentData)}
                    </div>
                </>
            )}
        </>
    );
}

export default Page;
