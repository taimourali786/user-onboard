import React, { useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../../store/alert';


export const CustomAlert = () => {
    const dispatch = useDispatch();
    const alert = useSelector(state => state.alert);
    const resetAlert = () => {
        dispatch(alertActions.resetAlert())
    }

    useEffect(() => {
        if (alert.content.message) {
            const timer = setTimeout(() => {
                resetAlert();
            }, 5000); // Hide error after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [alert]);

    if (!alert.content.message) return null;

    return (
        <div className="error-alert">
            <Snackbar
                open={alert.content.message !== null}
                autoHideDuration={5000}
                onClose={resetAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={resetAlert} severity={alert.style} sx={{ width: '300px' }}>
                    {alert.content.status && `${alert.content.status} : `}{alert.content.message}
                </Alert>
            </Snackbar>
        </div>
    );
};
