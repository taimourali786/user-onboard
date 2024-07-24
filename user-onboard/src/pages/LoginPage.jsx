import { useState } from 'react';
import FormField from "../components/FormField.jsx";

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
            <main className="flex items-center justify-center h-screen">
                <div className='form-container'>
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
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

                        <button className="button">Login</button>
                    </form>
                </div>
            </main >
        </>
    )
}