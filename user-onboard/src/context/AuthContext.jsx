import { createContext, useState, useEffect, useContext } from 'react';
import { useHttpClient } from '../HttpClient';
import { useLoading } from './LoadingContext';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { performLogin, getUser } = useHttpClient();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const { startLoading, stopLoading } = useLoading();

    const getUserInfo = async () => {
        try {
            const apiUser = await getUser();
            setUser(apiUser);
        } catch (error) {
            logout();
        }
    }

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('authorization');
            if (token) {
                startLoading();
                    await getUserInfo();
                setIsAuthenticated(true);
                stopLoading();
            }
        };
        initializeAuth();
    }, []);

    useEffect(() => {
        console.log("Is Auth", isAuthenticated);
    }, [isAuthenticated])

    const login = async (credentials) => {
        try {
            startLoading();
            const token = await performLogin(credentials);
            if (token) {
                await getUserInfo();
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Login failed', error);
            setIsAuthenticated(false);
        } finally {
            stopLoading();
        }
    };

    const logout = () => {
        localStorage.removeItem('authorization');
        setUser(null);
        setIsAuthenticated(false);
    };

    const refreshUser = async () => {
        if (user === null) {
            await getUserInfo();
        }
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, user, refreshUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
