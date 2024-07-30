import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext.jsx';

import FormHeading from "../components/base/FormHeading.jsx";
import Logo from '../components/base/Logo.jsx';
import TextField from '@mui/material/TextField';
import { validateEmail, validatePassword } from '../utils/Validator.js';


const isEmailInvalid = (edited, email) => {
    return edited && !(email.includes('@'));
};

const isPasswordInvalid = (edited, password) => {
    return edited && password.length < 8;
};

export default function LoginPage() {

    const { login, authError, isAuthenticated } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [validCredentials, setValidCredentials] = useState({ email: true, password: true })
    const [loading, setLoading] = useState(false);
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

        setLoading(true);
        await login(credentials);
        if (isAuthenticated) {
            setLoading(false);
            navigate("/");
        }
    };
    
    useEffect(() => {
        if (isAuthenticated) {  
            setLoading(false);
            navigate("/");
        }
    }, [isAuthenticated]);  
    return (
        <>
            <main>
                <div className="flex h-screen">
                    <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
                        <div className="max-w-md text-center">
                            <Logo />
                        </div>
                    </div>
                    <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
                        <div className="max-w-md w-full p-6 bg-white">
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
                            <div className="mt-4 text-sm text-gray-600 text-center ">
                                <p>Don't have an account? <Link to="/registration" className="ml-1 font-medium text-indigo-600 hover:text-indigo-500 hover:underline">Sign Up</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}