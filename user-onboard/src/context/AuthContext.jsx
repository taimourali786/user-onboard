import { createContext, useState, useEffect, useContext } from 'react';
import { useHttpClient } from '../HttpClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { performLogin, getUser } = useHttpClient();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);

    const getUserInfo = async () => {
        try {
            setAuthLoading(true);
            const apiUser = await getUser();
            setUser(apiUser);
            setIsAuthenticated(true);
        } catch (error) {
            logout();
        } finally{
            setAuthLoading(false);
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
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            setIsAuthenticated(false);
        } 
    };

    const logout = () => {
        localStorage.removeItem('authorization');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, authLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
