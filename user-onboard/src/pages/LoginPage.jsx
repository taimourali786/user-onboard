import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { Snackbar, Alert, TextField, Fab } from '@mui/material';

import FormHeading from "../components/base/FormHeading.jsx";
import Logo from '../components/base/Logo.jsx';
import { validateEmail, validatePassword } from '../utils/Validator.js';
import Spinner from '../components/base/Spinner.jsx';

export default function LoginPage() {
    const { login, isAuthenticated } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [validCredentials, setValidCredentials] = useState({ email: true, password: true })
    let navigate = useNavigate();

    const handleInputChange = (field, value) => {
        setCredentials(prevValues => {
            return {
                ...prevValues,
                [field]: value
            };
        });
        setValidCredentials(prevValues => {
            return {
                ...prevValues,
                [field]: true
            };
        });
    };

    const handleInputBlur = (field, value) => {
        setValidCredentials(prevValues => {
            let valid = false;
            if (field == "email") {
                valid = validateEmail(value)
            } else if (field == "password") {
                valid = validatePassword(value);
            }
            return {
                ...prevValues,
                [field]: valid
            };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateEmail(credentials.email) || !validatePassword(credentials.password)) {
            setValidCredentials({ email: validateEmail(credentials.email), password: validatePassword(credentials.password) });
            return;
        }
        await login(credentials);
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home");
        }
    }, [isAuthenticated]);  
    
    return (
        <>
            <main className="flex min-h-screen">
                <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
                    <div className="max-w-md text-center">
                        <Logo />
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center bg-gray-100 p-4">
                    <div className="max-w-lg w-full bg-white shadow-xl rounded-xl p-6">
                        <FormHeading className="text-indigo">Login to Your Account</FormHeading>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <TextField
                                    id="email"
                                    label="Email"
                                    type="email"
                                    name="email"
                                    className="mt-1 px-3 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                                    error={!validCredentials.email}
                                    helperText={!validCredentials.email ? 'Please enter a valid email' : ""}
                                    value={credentials.email}
                                    onBlur={event => handleInputBlur('email', event.target.value)}
                                    onChange={(event) => handleInputChange('email', event.target.value)}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="password"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    className="mt-1 px-3 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                                    error={!validCredentials.password}
                                    helperText={!validCredentials.password ? 'Please enter a valid password. (Minimum 8 characters)' : ""}
                                    value={credentials.password}
                                    onBlur={event => handleInputBlur('password', event.target.value)}
                                    onChange={(event) => handleInputChange('password', event.target.value)}
                                />
                            </div>
                            <div>
                                <button type="submit" className="w-full text-white p-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Log In
                                </button>
                            </div>
                        </form>
                        <div className="mt-4 text-sm text-gray-600 text-center">
                            <p>Don't have an account? <Link to="/registration" className="ml-1 font-medium text-indigo-600 hover:text-indigo-500 hover:underline">Sign Up</Link></p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}