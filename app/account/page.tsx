"use client";

import { Input } from "@/components/catalyst/input";
import { useSession } from "next-auth/react";

export default function AccountPage() {
    const { data: session, status } = useSession();

    if (status == "unauthenticated") {
        return <h1>Please log in</h1>;
    }
    if (status == "loading") {
        return <h1>Loading...</h1>;
    }
    return (
        <div>
            <form>
                Team Number: <Input />
            </form>
        </div>
    );
}