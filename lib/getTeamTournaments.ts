import axios from "axios";
import ftcAPI from "@/app/api/ftcAPI";

export default async function getTeamTournaments(id: string) {
    try {
        const request = await ftcAPI.get("events", {
            params: { teamNumber: id },
        });
        return request.data;
    } catch (e) {
        console.log(e);
        return { error: "Internal server error" };
    }
}
