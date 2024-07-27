import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import FormField from "../components/FormField.jsx";
import Button from "../components/Button.jsx";
import FormHeading from "../components/FormHeading.jsx";

const isEmailInvalid = (edited, email) => {
    return edited && !(email.includes('@') && email.includes(".com"));
};

const isPasswordInvalid = (edited, password) => {
    return edited && password.length < 8;
};
const dummyUser = { email: "abc@gmail.com", password: "admin123" };
export default function LoginPage() {

    const [formValues, setFormValues] = useState({ email: '', password: '' });
    const [formValuesEdited, setFormValuesEdited] = useState({ email: false, password: false });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
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

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isEmailInvalid(formValuesEdited.email, formValues.email)
            || isPasswordInvalid(formValuesEdited.password, formValues.password)) {
            setError(true)
            return;
        }
        if (formValues.email === dummyUser.email
            && formValues.password === dummyUser.password) {
            let baseUrl = window.location.origin;
            let homePageUrl = `${baseUrl}/`
            // let history = useHistory();
            navigate("/");
            // history.push('/');
            setFormValues({ email: '', password: '' });
            setFormValuesEdited({ email: false, password: false });
            // window.history.pushState(null, null, '/');
        }
    };

    return (
        <>
            <main>
            
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-500">
                    <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                        <FormHeading>Login to Your Account</FormHeading>
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