import axios from "axios";

export default async function authenticateUser(username, password) {
    try {
        const res = axios.post(
            "http://localhost:3000/auth/",
            {
                username,
                password,
            },
            {
                withCredentials: true,
            }
        );
        return res;
    }
    catch (err) {
        console.log(err);
    }
}