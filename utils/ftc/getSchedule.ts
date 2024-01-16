import { ftcAPI } from "@/utils/ftc/ftcAPI";
import { paths } from "@/utils/ftc/ftcOpenApi";

type Output =
    paths["/v2.0/{season}/schedule/{eventCode}/{tournamentLevel}/hybrid"]["get"]["responses"][200]["content"]["application/json"];
export async function getSchedule(eventId: string) {
    return ftcAPI.get<Output>(`schedule/${eventId}/qual/hybrid`);
}
