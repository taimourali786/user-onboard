import React, { createContext, useState, useContext } from 'react';

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);

    const handleError = (errorMessage) => {
        setError(errorMessage);
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

export const useError = () => useContext(ErrorContext);
