import axios from "axios";
// import { UserModel } from "../models/User";
// import { UpdataAccess } from "../models/UpdataAccessToken";
import BACKEND_URL from "../constants/constants";
import { UserModel } from "../models/user";

interface a {
    member_id: string,
    email: string,
    name: string,
    last_name: string
}

class AuthService {
    setUserInLocalStorage(data: UserModel) {
        localStorage.setItem("user", JSON.stringify(data));
    }

    async refreshToken(refresh: string) {
        const response = await axios.post(`${BACKEND_URL}/users/refresh/`, { refresh: refresh })
        if (!response?.data?.access) {
            return response.data
        } else { return response?.data?.access }
    }

    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        const user = localStorage.getItem("user")!;
        return JSON.parse(user);
    }

    async login(data: a, headers: any) {
        const response = await axios.post(`${BACKEND_URL}/users/login/`, data, {
            headers: headers
        })
        return response
    }
}

export default new AuthService();
