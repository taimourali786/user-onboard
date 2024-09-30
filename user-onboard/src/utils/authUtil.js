import { redirect } from "react-router-dom";
import store from "../store";
export const getToken = () => {
    const token = localStorage.getItem('authorization');
    return token || null;
};

export const getBearerToken = () => {
    const token = localStorage.getItem('authorization');
    return "Bearer " + token || '';
};
export const removeToken = () => {
    localStorage.removeItem('authorization')
}

export const setToken = (tokenƒ) => {
    const token = localStorage.setItem('authorization', token);
    return "Bearer " + token;
};

export const checkAuth = () => {
    const token = getToken()
    if (!token) {
        return redirect('/login');
    }
    
    return token;
}

