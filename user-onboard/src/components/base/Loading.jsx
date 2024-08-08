import React from 'react';
import Spinner from './Spinner';
import { useLoading } from '../../context/LoadingContext';

const Loading = ({ children }) => {
    const { isLoading } = useLoading();
    
    if (isLoading) {
        return <Spinner loading={isLoading} />;
    }

    return children;
};

export default Loading;
