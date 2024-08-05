import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);
    // const { logout } = useAuth();

    const handleError = async (response) => {
        if (response.status === 401) {
            console.log("masla")
        }
        const msg = await getErrorMessage(response);
        setError(msg);
    };

    const resetError = () => {
        setError(null);
    };

    return (
        <ErrorContext.Provider value={{ error, handleError, resetError }}>
            {children}
        </ErrorContext.Provider>
    );
};

const getErrorMessage = async (response) => {
    return response.json().then(json => json.responseMessage);
};

export const useError = () => useContext(ErrorContext);
