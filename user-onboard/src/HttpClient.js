import { LOGIN, SEND_OTP, VALIDATE_OTP } from "./ApiUrl";

export const performGet = async (url, queryParams = {}) => {
    const queryString = new URLSearchParams(queryParams).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    try {
        const token = getToken();
        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error for further handling if needed
    }
}

export const performPost = async (url, body = {}) => {

    try {
        const token = getToken();
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error for further handling if needed
    }
}

export const performLogin = async (body) => {
    try{
        const tokenJson = await performPost(LOGIN, body)
        .then(async response => await response.json());
        const token = tokenJson.token;
        // setToken(token);
        return token;
    } catch(error){
        return null;
    }
}

export const sendOtp = async (body) => {
    try{
        await performPost(SEND_OTP, body);
        return true
    } catch(error){
        return false;
    }
} 

export const validateOtp = async (body) => {
    try{
        await performPost(VALIDATE_OTP, body);
        return true
    } catch(error){
        return false;
    }
} 


const getToken = () => {
    const token = localStorage.getItem("authorization");
    return token;
}