import { ftcAPI } from "@/utils/ftc/ftcAPI";
import { paths } from "@/utils/ftc/ftcOpenApi";

type Output =
    paths["/v2.0/{season}/events"]["get"]["responses"][200]["content"]["application/json"];
export async function getTeamTournaments(teamNumber: string) {
    return ftcAPI.get<Output>("events", {
        params: {
            teamNumber,
        },
    });
}
