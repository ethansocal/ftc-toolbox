import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function AuthButton() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const signInDiscord = async () => {
        "use server";

        const getURL = () => {
            let url =
                process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
                process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
                "http://localhost:3000/";
            // Make sure to include `https://` when not localhost.
            url = url.includes("http") ? url : `https://${url}`;
            // Make sure to include a trailing `/`.
            url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
            return url;
        };

        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "discord",
            options: {
                redirectTo: `${getURL()}/auth/callback`,
            },
        });

        if (error) {
            return redirect("/login?message=Could not authenticate user");
        }

        return redirect(data.url);
    };

    const signOut = async () => {
        "use server";

        const cookieStore = cookies();
        const supabase = createClient(cookieStore);
        await supabase.auth.signOut();
        return redirect("/login");
    };

    return user ? (
        <div className="flex items-center gap-4">
            Hey, {user.email}!
            <form action={signOut}>
                <Button>Logout</Button>
            </form>
        </div>
    ) : (
        <form action={signInDiscord}>
            <Button>Login with Discord</Button>
        </form>
    );
}
