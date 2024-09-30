import { useError } from './context/ErrorContext';

import { GET_PREFERENCES, GET_USER, LOGIN, REGISTRAtION_1, SEND_OTP, VALIDATE_OTP, POST_PREFERENCES, UPDATE_IMAGE, CARD_STATUS_UPDATE } from "./ApiUrl";
import { getBearerToken } from './utils/authUtil';

export const useHttpClient = () => {
    const { handleError } = useError();

    const performGet = async (url, queryParams = {}) => {
        const queryString = new URLSearchParams(queryParams).toString();
        const fullUrl = queryString ? `${url}?${queryString}` : url;

        try {
            const token = getBearerToken();
            const response = await fetch(fullUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });

            if (!response.ok) {
                handleError(response);
            }
            return response;
        } catch (error) {
            handleError(error.message);
            throw error;
        }
    };

    const performPost = async (url, body = {}) => {
        try {
            const token = getBearerToken();
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });

            if (!response.ok) {
                handleError(response);
                throw new Error();
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

    const getUser = async () => {
        const response = await performGet(GET_USER);
        const json = await response.json();
        return json.responseContent;
    }

    const getPreferences = async () => {
        const response = await performGet(GET_PREFERENCES);
        const json = await response.json();
        return json.responseContent;
    }

    const postPreferences = async (body) => {
        const response = await performPost(POST_PREFERENCES, body);
        return true;
    }
    
    const postImage = async(body) => {
        const response = await performPost(UPDATE_IMAGE, body);
        return true;
    }
    const updateCardStatus = async(body) => {
        const response = await performPost(CARD_STATUS_UPDATE, body);
        return true;
    }

    return {
        performGet,
        performPost,
        sendOtp,
        performLogin,
        performRegistration1,
        validateOtp,
        getUser,
        getPreferences,
        postPreferences,
        postImage,
        updateCardStatus
    };
};


