import axios from "axios";

const SEASON = 2023;
export const ftcAPI = axios.create({
    baseURL: `https://ftc-api.firstinspires.org/v2.0/${SEASON}/`,
    auth: {
        username: process.env.FTC_USERNAME!,
        password: process.env.FTC_PASSWORD!,
    },
});
