import { LOGIN, REGISTRAtION_1, SEND_OTP, VALIDATE_OTP } from "./ApiUrl";


import { useError } from './context/ErrorContext';

export const useHttpClient = () => {
    const { handleError } = useError();

    const performGet = async (url, queryParams = {}) => {
        const queryString = new URLSearchParams(queryParams).toString();
        const fullUrl = queryString ? `${url}?${queryString}` : url;

        try {
            const token = getToken();
            const response = await fetch(fullUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });

            if (!response.ok) {
                const msg = await getErrorMessage(response);
                handleError(msg);
                throw new Error(`Request Failed: ${response.status} \n ${msg} `);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            handleError(error.message);
            throw error;
        }
    };

    const performPost = async (url, body = {}) => {
        try {
            const token = getToken();
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });

            if (!response.ok) {
                const msg = await getErrorMessage(response);
                handleError(msg);
                throw new Error(`Request Failed: ${response.status} \n ${msg} `);
            }

            return response;
        } catch (error) {
            handleError(error.message);
            throw error;
        }
    };
    const performLogin = async (body) => {
        const tokenJson = await performPost(LOGIN, body)
            .then(async response => await response.json());
        const token = tokenJson.responseContent.token;
        localStorage.setItem('authorization', token);
        return token;
    }

    const performRegistration1 = async (body) => {
        const tokenJson = await performPost(REGISTRAtION_1, body)
            .then(async response => await response.json());
        const token = tokenJson.responseContent.token;
        localStorage.setItem('authorization', token);
        return token;
    }

    const sendOtp = async (body) => {
        await performPost(SEND_OTP, body);
        return true
    }
    const validateOtp = async (body) => {
        await performPost(VALIDATE_OTP, body);
        return true
    }

    return { performGet, performPost, sendOtp, performLogin, performRegistration1, validateOtp };
};

const getToken = () => {
    const token = localStorage.getItem('authorization');
    return "Bearer " + token;
};

const getErrorMessage = async response => {
    return response.json().then(json => json.responseMessage);
}
