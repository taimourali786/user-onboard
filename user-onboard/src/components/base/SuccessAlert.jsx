import React, { useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useSuccess } from '../../context/SuccessContext';


export const SuccessAlert = () => {
    const { success, resetSuccess } = useSuccess();

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                resetSuccess();
            }, 5000); // Hide error after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [success, resetSuccess]);

    if (!success) return null;

    return (
        <div className="error-alert">
            <Snackbar
                open={success !== null}
                autoHideDuration={5000}
                onClose={resetSuccess}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={resetSuccess} severity="success" sx={{ width: '300px' }}>
                    {success}
                </Alert>
            </Snackbar>
        </div>
    );
};
