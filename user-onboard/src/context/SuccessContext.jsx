import React, { createContext, useState, useContext } from 'react';

export const SuccessContext = createContext();

export const SuccessProvider = ({ children }) => {
    const [success, setSuccess] = useState(null);

    const handleSuccess = (message) => {
        setSuccess(message);
    };

    const resetSuccess = () => setSuccess(null);

    return (
        <SuccessContext.Provider value={{ success, handleSuccess, resetSuccess }}>
            {children}
        </SuccessContext.Provider>
    );
};

export const useSuccess = () => useContext(SuccessContext);
