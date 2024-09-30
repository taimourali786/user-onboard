import React, { useEffect } from 'react';
import { useError } from '../../context/ErrorContext';
import { Snackbar, Alert } from '@mui/material';


export const ErrorAlert = () => {
    const { error, resetError } = useError();

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                resetError();
            }, 5000); // Hide error after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [error, resetError]);

    if (!error) return null;

    return (
        <div className="error-alert">
            <Snackbar
                open={error !== null}
                autoHideDuration={5000}
                onClose={resetError}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={resetError} severity="error" sx={{ width: '300px' }}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};
