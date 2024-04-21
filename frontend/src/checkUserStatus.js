import axios from "axios";

export default async function checkUserStatus() {
    const res = await axios.get("http://localhost:3000/auth/status");

    return res.data;
}