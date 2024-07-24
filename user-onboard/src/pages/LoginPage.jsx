import { useState } from 'react';
import FormField from "../components/FormField.jsx";
import { Link } from 'react-router-dom';

const isEmailInvalid = (edited, email) => {
    return edited && !(email.includes('@') && email.includes(".com"));
};

const isPasswordInvalid = (edited, password) => {
    return edited && password.length < 8;
};

export default function LoginPage() {

    const [formValues, setFormValues] = useState({ email: '', password: '' });
    const [formValuesEdited, setFormValuesEdited] = useState({ email: false, password: false });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});

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

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isEmailInvalid(formValuesEdited.email, formValues.email)
            || isPasswordInvalid(formValuesEdited.password, formValues.password)) {
            return;
        }

        setFormValues({ email: '', password: '' });
        setFormValuesEdited({ email: false, password: false });
    };

    return (
        <>
            <main>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-500">
                <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Login to Your Account</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                    <FormField 
                        htmlFor="email"
                        labelText="Email"
                        id="email"
                        type="email"
                        name="email"
                        labelClassName="block text-sm font-medium text-gray-700"
                        inputClassName="mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
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
                        labelClassName="block text-sm font-medium text-gray-700"
                        inputClassName="mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                        isInvalid={passwordInValid}
                        value={formValues.password}
                        errorMessage="Please Enter a valid password."
                        handleBlur={() => handleInputBlur('password')}
                        handleChange={(event) => handleInputChange('password', event.target.value)}
                    />
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            Don't have an account?
                            <Link to="/registration" className="font-medium text-indigo-600 hover:text-indigo-500"> Sign up</Link>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>
                    </form>
                </div>
            </div>
            </main>
        </>
    )
}