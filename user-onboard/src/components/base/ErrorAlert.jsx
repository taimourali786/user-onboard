import React, { useEffect } from 'react';
import { useError } from '../../context/ErrorContext';
import { Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { errorActions } from '../../store/error';


export const ErrorAlert = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.error);

    const resetError = () => {
        dispatch(errorActions.resetError())
    }

    useEffect(() => {
        if (error.message) {
            const timer = setTimeout(() => {
                resetError();
            }, 5000); // Hide error after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [error]);

    if (!error) return null;

    return (
        <div className="error-alert">
            <Snackbar
                open={error.message !== null}
                autoHideDuration={5000}
                onClose={resetError}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={resetError} severity="error" sx={{ width: '300px' }}>
                    {error.status && `${error.status} : `}{error.message}
                </Alert>
            </Snackbar>
        </div>
    );
};
