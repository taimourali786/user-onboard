import React, { createContext, useState } from 'react';

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);

    const handleHttpError = (statusCode) => {
        console.log("I was called");  // Corrected console.log
        switch (statusCode) {
            case 400:
                setError(ERRORS.BAD_REQUEST);
                break;
            case 401:
                setError(ERRORS.UNAUTHORIZED);
                break;
            case 500:
                setError(ERRORS.SERVER_ERROR);
                break;
            case 501:
                setError(ERRORS.SERVICE_UNAVAILABLE);
                break;
            default:
                setError(ERRORS.UNKNOWN_ERROR);
                break;
        }
    }

    const resetError = () => setError(null);

    return (
        <ErrorContext.Provider value={{ error, handleHttpError, resetError }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const ERRORS = {
    UNAUTHORIZED: 'UNAUTHORIZED',
    BAD_REQUEST: 'BAD_REQUEST',
    SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
    SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};
