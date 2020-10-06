import api from "../../utils/api.util"

export const login = async (content: any) => {
    const endpoint = "/api/users/login"
    const { data } = await api.post(endpoint, { ...content })
    updateAuthData(data);
    return data;
};

export const signup = async (content: any) => {
    const endpoint = "/api/users/signup"
    const { data } = await api.post(endpoint, { ...content });
    updateAuthData(data);
    return data;
};

const updateAuthData = (data: any) => {
    localStorage.setItem("email", data.user && data.user.email || data.email )
    localStorage.setItem("name",  data.user && data.user.name || data.name)
    localStorage.setItem("token", data.token)
}
