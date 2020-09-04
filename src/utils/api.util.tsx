import axios from "axios"
import dotenv from "dotenv"
import authUser from "./authUser.util";
dotenv.config()

const uri = process.env.REACT_APP_API_URL

export const authUserHeader = () => {
    const token = authUser();
    if (token) {
        return {
            Authorization: `Bearer ${token}`,
        };
    }
    return {};
};

const instance = axios.create({
    baseURL: uri,
    headers: {
        'Content-Type': 'application/json',
        ...authUserHeader(),
    },
})

export default instance;