import { createContext, useState, useEffect, useContext } from 'react';
import { useHttpClient } from '../HttpClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { performLogin, getUser } = useHttpClient();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [authError, setAuthError] = useState(null);

    const getUserInfo = async () => {
        try {
            const apiUser = await getUser();
            setUser(apiUser);
            setIsAuthenticated(true);
        } catch (error) {
            logout();
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('authorization');
        if (token) {
            getUserInfo();
        }
    }, []);

    const login = async (credentials) => {
        try {
            const token = await performLogin(credentials);
            if (token) {
                await getUserInfo();
                setAuthError(null);
            } else {
                setAuthError("Failed to Login");
                setIsAuthenticated(false);
            }
        } catch (error) {
            setAuthError("Failed to Login");
            setIsAuthenticated(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('authorization');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, authError, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
