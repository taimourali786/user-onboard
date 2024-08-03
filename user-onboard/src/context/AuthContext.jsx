import { createContext, useState, useEffect } from 'react';
import { performLogin } from '../HttpClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authError, setAuthError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authorization');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (credentials) => {
        const token = await performLogin(credentials);
        if (token !== null) {
            localStorage.setItem('authorization', token);
            setIsAuthenticated(true);
            setAuthError(null);
        } else{
            setAuthError({
                message: "Failed to Login"
            })
            setIsAuthenticated(false)
        }
    };

    const logout = () => {
        localStorage.removeItem('authorization');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, authError, setAuthError, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
