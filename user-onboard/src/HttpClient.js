import { LOGIN } from "./ApiUrl";

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

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error for further handling if needed
    }
}

export const performLogin = async (body) => {
    try{
        const tokenJson = await performPost(LOGIN, body);
        const token = tokenJson.token;
        // setToken(token);
        return token;
    } catch(error){
        return null;
    }
}


const getToken = () => {
    const token = localStorage.getItem("authorization");
    return token;
}

const setToken = token => {
    localStorage.setItem("authorization", token);
}
