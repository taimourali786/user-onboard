import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { loadingActions } from '../store/loading';
import { errorActions } from "../store/error";
import { getToken } from "../utils/authUtil";


const sendRequest = async (url, config) => {
    try {

        const response = await fetch(url, config);
        const json = await response.json();
        if (!response.ok) {
            // throw new Error({ message: response.message, status: response.status })
        }
        return json;
    } catch (e) {
        // throw new Error({message: e.message})
    }
}
// Defining these here will help to perform get calls
const useHttp = (url, config, initialState) => {
    const [responseData, setResponseData] = useState(initialState);
    const dispatch = useDispatch();

    //  This function will perform Api Call
    const performApiCall = useCallback((newUrl, body, updatedConfig) => {
        try {
            dispatch(loadingActions.startLoading())
            const responseJson = sendRequest(newUrl || url,
                { config: updatedConfig || config, body });
            setResponseData(responseJson);
        } catch (error) {
            dispatch(errorActions.setError({ error }))
        } finally {
            dispatch(loadingActions.stopLoading())
        }
    }, [url, config])

    useEffect(() => {
        if ((config && (!config.method || config.method === 'GET')) || !config) {
            if (getToken()) {
                performApiCall();
            }
        }
    }, [performApiCall])

    return {
        responseData,
        performApiCall
    }
}
export default useHttp;