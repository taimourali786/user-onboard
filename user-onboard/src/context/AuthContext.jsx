import { createContext, useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHttpClient } from '../HttpClient';
import useHttp from '../hooks/useHttp';
import { getBearerToken } from '../utils/authUtil';
import { userActions } from '../store/user';
import { GET_USER, LOGIN } from '../ApiUrl';

export const AuthContext = createContext();
const defaultConfig = {
    method: 'GET',
    headers: {
        'Authorization': getBearerToken()
    }
}
export const AuthProvider = ({ children }) => {
    const { response, performApiCall } = useHttp(GET_USER, defaultConfig);
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector(state => ({
        user: state.user.user,
        isAuthenticated: state.user.isAuthenticated
    }))
    const { performLogin, getUser } = useHttpClient();

    const setUser = async (fn) => {
        const token = getBearerToken();
        if (token) {
            try {
                const user = await fn();
                dispatch(userActions.setUser({ user: response }));
            } catch (e) {
                //  TODO: Handle error
            } finally {
            }
        }
    }

    useEffect(() => {
        setUser(getUser)
        // if (response != null) {
        //     dispatch(userActions.setUser({ user: response }));
        // }
    }, []);

    const login = async (credentials) => {
        setUser(() => performLogin(credentials));
    };

    const logout = () => {
        dispatch(userActions.resetUser())
    };

    const refreshUser = async () => {
        if (user === null) {
            await getUserInfo();
            setIsAuthenticated(true);
        }
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, user, refreshUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
