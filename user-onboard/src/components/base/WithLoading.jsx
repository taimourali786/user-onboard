import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Spinner from './Spinner';

const WithAuthLoading = ({ children }) => {
    const { authLoading } = useAuth();

    if (authLoading) {
        return <Spinner loading={authLoading}/>
    }

    return children;
};

export default WithAuthLoading;
