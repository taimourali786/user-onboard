import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { loadingActions } from '../store/loading';
import { errorActions } from "../store/error";
import { getToken } from "../utils/authUtil";
import { userActions } from "../store/user";


const sendRequest = async (url, config, dispatch) => {
    try {
        const response = await fetch(url, config);
        const json = await response.json();
        if (!response.ok) {
            dispatch(errorActions.setError({
                error: {
                    message: json.responseMessage,
                    status: response.status
                }
            }))
        }
        return json;
    } catch (e) {
        dispatch(errorActions.setError({
            message: e.message,
        }))
    }
}

// Defining these here will help to perform get calls
const useHttp = (url, config, initialState) => {
    // const [response, setResponse] = useState(initialState);
    const dispatch = useDispatch();

    //  This function will perform Api Call
    const performApiCall = useCallback(async (jsonBody) => {
        dispatch(loadingActions.startLoading())
        const newConfig = { ...config, body: jsonBody }
        const responseJson = await sendRequest(url, newConfig, dispatch)
        dispatch(userActions.setUser(responseJson));
        dispatch(loadingActions.stopLoading())
        // try {
        // } catch (error) {
        // } finally {
        // }
    }, [url, config])

    useEffect(() => {
        if ((config && (!config.method || config.method === 'GET')) || !config) {
            if (getToken()) {
                performApiCall();
            }
        }
    }, [performApiCall])

    return {
        // response,
        performApiCall
    }
}
export default useHttp;