import axios from "axios";

export default async function logout() {
    try {
        const res = axios.post("http://localhost:3000/auth/logout",
    {}, {
        withCredentials: true
    });
        return res;
    } catch (err) {
        console.log(err);
    }
}