import { useCallback, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { loadingActions } from '../store/loading';
import { getToken } from "../utils/authUtil";
import { userActions } from "../store/user";
import { alertActions } from "../store/alert";


const sendRequest = async (url, config, dispatch) => {
    try {
        const response = await fetch(url, config);
        const json = await response.json();
        if (!response.ok) {
            dispatch(alertActions.setAlert({
                alert: {
                    type: 'error',
                    message: json.responseMessage,
                    status: response.status
                }
            }))
            // throw new Error('Request Failed!')
        }
        return json;
    } catch (e) {
        dispatch(alertActions.setError({
            alert: {
                type: 'error',
                message: e.message,
                status: 500
            }
        }))
        throw new Error(e.message)
    }
}

// Defining these here will help to perform get calls
const useHttp = (url, config, initialState) => {
    // const [response, setResponse] = useState(initialState);
    const dispatch = useDispatch();

    //  This function will perform Api Call
    const performApiCall = useCallback(async (jsonBody) => {
        try {
            dispatch(loadingActions.startLoading())
            const newConfig = { ...config, body: jsonBody }
            const responseJson = await sendRequest(url, newConfig, dispatch)
            dispatch(userActions.setUser(responseJson));
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
        // response,
        performApiCall
    }
}
export default useHttp;