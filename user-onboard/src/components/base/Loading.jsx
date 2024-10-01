import React from 'react';
import Spinner from './Spinner';
import { useSelector } from 'react-redux';

const Loading = ({ children }) => {
    const loading = useSelector(state => state.loading.loading)
    if (loading) {
        return <Spinner loading={loading} />;
    }

    return children;
};

export default Loading;
