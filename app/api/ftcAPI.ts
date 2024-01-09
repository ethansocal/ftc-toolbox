import axios from "axios";

const SEASON = "2023";

export default axios.create({
    // Should be ftc-events, but that isn't working due to cross site credentials
    baseURL: `https://ftc-api.firstinspires.org/v2.0/${SEASON}/`,
    timeout: 1000,
    auth: {
        username: process.env.FTC_USERNAME!,
        password: process.env.FTC_PASSWORD!,
    },
    validateStatus: (status) =>
        (status >= 200 && status < 300) || status === 400,
    withCredentials: true,
    maxRedirects: 100,
});
