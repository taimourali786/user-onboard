import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { AuthContext } from '../utils/AuthContext.jsx';

import FormField from "../components/base/FormField.jsx";
import Button from "../components/base/Button.jsx";
import FormHeading from "../components/base/FormHeading.jsx";

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

        await login(formValues);
        if (isAuthenticated) {
            navigate("/");
            setFormValues({ email: '', password: '' });
            setFormValuesEdited({ email: false, password: false });
        }
    };

    return (
        <>
            <main>
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-500">
                    <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                        <FormHeading>Login to Your Account</FormHeading>
                        {authError && <Alert severity="error"> {authError.message} </Alert> }
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <FormField
                                htmlFor="email"
                                labelText="Email"
                                id="email"
                                type="email"
                                name="email"
                                isInvalid={emailInValid}
                                value={formValues.email}
                                errorMessage="Please Enter a valid email."
                                handleBlur={() => handleInputBlur('email')}
                                handleChange={(event) => handleInputChange('email', event.target.value)}
                            />
                            <FormField
                                htmlFor="password"
                                labelText="Password"
                                id="password"
                                type="password"
                                name="password"
                                isInvalid={passwordInValid}
                                value={formValues.password}
                                errorMessage="Please Enter a valid password."
                                handleBlur={() => handleInputBlur('password')}
                                handleChange={(event) => handleInputChange('password', event.target.value)}
                            />
                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    Don't have an account?
                                    <Link to="/registration" className="ml-1 font-medium text-indigo-600 hover:text-indigo-500 hover:underline">Sign up</Link>
                                </div>
                            </div>
                            <div>
                                <Button type="submit" stlyeClasses="w-full" handleClick={handleSubmit}>
                                    Sign in
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}