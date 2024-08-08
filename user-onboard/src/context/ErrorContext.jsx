import React, { createContext, useState, useContext } from 'react';

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);

    const handleError = async (response) => {
        if (response.status === 401) {
            setError("Invalid Token");
        } else if (response.status === 500) {
            setError("Internal Server Error");
        } else if (response === 'Failed to fetch') {
            setError('Failed to fetch');
        } else {
            const msg = await getErrorMessage(response);
            setError(msg);
        }
    };

    const setErrorMessage = (msg) => {
        setError(msg);
    }

    const resetError = () => {
        setError(null);
    };

    return (
        <ErrorContext.Provider value={{ error, handleError, resetError, setErrorMessage }}>
            {children}
        </ErrorContext.Provider>
    );
};

const getErrorMessage = async (response) => {
    const json = await response.json();
    return  json.responseMessage;
};

export const useError = () => useContext(ErrorContext);
