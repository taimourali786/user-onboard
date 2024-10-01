import { createContext, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import useHttp from '../hooks/useHttp';
import { getBearerToken } from '../utils/authUtil';
import { userActions } from '../store/user';
import { GET_USER, LOGIN } from '../ApiUrl';

export const AuthContext = createContext({
    login: () => { },
    logout: () => { },
    refreshUser: () => { }
});
const getUserConfig = {
    method: 'GET',
    headers: {
        'Authorization': getBearerToken()
    }
}
const loginConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}
export const AuthProvider = ({ children }) => {
    const { performApiCall } = useHttp(GET_USER, getUserConfig);
    const { performApiCall: performLogin } = useHttp(LOGIN, loginConfig);
    const dispatch = useDispatch();
    const { user } = useSelector(state => ({
        user: state.user.user
    }))

    const login = async (credentials) => {
        await performLogin(JSON.stringify(credentials))
        // setUser(() => performLogin(JSON.stringify(credentials)));
    };

    const logout = () => {
        dispatch(userActions.resetUser())
    };

    const refreshUser = async () => {
        if (user === null) {
            performApiCall();
        }
    }
    return (
        <AuthContext.Provider value={{ refreshUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
