import axios from "axios";

export default async function createUser(username, email, password){
    try {
        const res = await axios.post(
            "http://localhost:3000/users/",
            {
                username,
                email,
                password
            }
        );
        return res;
    }
    catch (err) {
        console.log(err);
    }
}