import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { AuthContext } from '../utils/AuthContext.jsx';

import FormField from "../components/base/FormField.jsx";
import Button from "../components/base/Button.jsx";
import FormHeading from "../components/base/FormHeading.jsx";
import Logo from '../components/base/Logo.jsx';
import TextField from '@mui/material/TextField';


const isEmailInvalid = (edited, email) => {
    return edited && !(email.includes('@'));
};

const isPasswordInvalid = (edited, password) => {
    return edited && password.length < 8;
};

export default function LoginPage() {

    const { login, authError, isAuthenticated } = useContext(AuthContext);
    const [formValues, setFormValues] = useState({ email: '', password: '' });
    const [formValuesEdited, setFormValuesEdited] = useState({ email: false, password: false });
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();


    const handleInputChange = (field, value) => {
        setFormValues(prevValues => {
            return {
                ...prevValues,
                [field]: value
            };
        });
        setFormValuesEdited(prevValues => {
            return {
                ...prevValues,
                [field]: false
            };
        });
    };

    const handleInputBlur = (field) => {
        setFormValuesEdited(prevValues => {
            return {
                ...prevValues,
                [field]: true
            };
        });
    };

    const emailInValid = isEmailInvalid(formValuesEdited.email, formValues.email);
    const passwordInValid = isPasswordInvalid(formValuesEdited.password, formValues.password);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isEmailInvalid(formValuesEdited.email, formValues.email)
            || isPasswordInvalid(formValuesEdited.password, formValues.password)) {
            return;
        }
        setLoading(true);
        await login(formValues);
        if (isAuthenticated) {
            setLoading(false);
            navigate("/");
            setFormValues({ email: '', password: '' });
            setFormValuesEdited({ email: false, password: false });
        }
    };

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
                                    error={emailInValid}
                                    helperText={emailInValid ? 'Please enter a valid email' : ""}
                                    value={formValues.email}
                                    onBlur={() => handleInputBlur('email')}
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
                                    error={passwordInValid}
                                    helperText={passwordInValid ? 'Please enter a valid password' : ""}
                                    value={formValues.password}
                                    onBlur={() => handleInputBlur('password')}
                                    onChange={(event) => handleInputChange('password', event.target.value)}
                                />
                            </div>
                            <div>
                                <button type="submit" className="w-full bg-black text-white p-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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