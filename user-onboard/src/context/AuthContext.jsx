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
            console.error('Failed to fetch user info', error);
            logout();
        } finally {
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
                setIsAuthenticated(true);
                await getUserInfo();
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Login failed', error);
            setIsAuthenticated(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('authorization');
        setUser(null);
        setIsAuthenticated(false);
    };

    const refreshUser = async () => {
        if(user === null){
            await getUserInfo();
        }
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, user, authLoading, refreshUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
