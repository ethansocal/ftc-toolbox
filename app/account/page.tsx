import React from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

async function Page() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (user == null) {
        return <h1>Please sign in.</h1>;
    }

    async function saveProfile(formData: FormData) {
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
    }
    return (
        <div>
            <h1>Hi, {user.email}</h1>
            <form action={saveProfile}>
                <Input type="text" name="teamNumber" />
                <Button>Submit</Button>
            </form>
        </div>
    );
}

export default Page;
