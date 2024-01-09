import { GetServerSideProps } from "next";
import getCurrentTournament from "@/app/api/scouting/currentTournament/getCurrentTournament";
import useSWR, { SWRConfig } from "swr";
import { fetcher } from "@/lib/utils";
import getTeamTournaments from "@/lib/getTeamTournaments";
import { getServerSession } from "next-auth/next";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";

function Article() {
    // `data` will always be available as it's in `fallback`.
    const { data } = useSWR("/api/getUserTeamTournaments", fetcher);
    return <h1>{data}</h1>;
}

export default function Page() {
    // SWR hooks inside the `SWRConfig` boundary will use those values.
    return (
        <SWRConfig>
            <Article />
        </SWRConfig>
    );
}
