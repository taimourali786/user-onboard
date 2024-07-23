import { useState } from 'react';
import FormField from "../components/FormField.jsx";

const isEmailValid = (edited, email) => { 
    return edited && (email.includes('@') && email.includes(".com"));
};

const isPasswordValid = (edited, password) => { 
    return edited && password.length >= 8;
};

export default function LoginPage() {

    const [formValues, setFormValues] = useState({ email: '', password: '' });
    const [formValuesEdited, setFormValuesEdited] = useState({ email: false, password: false });

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
                [field]: true
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

    const emailInValid = isEmailValid(formValuesEdited.email, formValues.email);
    const passwordInValid = isPasswordValid(formValuesEdited.password, formValues.password);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (emailInValid || passwordInValid) {
            console.log("Invalid");
            console.log(formValues);
            console.log(formValuesEdited);
            console.log(emailInValid, passwordInValid);
            return;
        }

        console.log("Sending Response!");
        setFormValues({ email: '', password: '' });
        setFormValuesEdited({ email: false, password: false });
    };

    return (
        <>
            <main className=" mx-8">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
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
            </main >
        </>
    )
}