import {useState } from 'react';
import { Button, Box, TextField } from '@mui/material';
import { validateStep1 } from '../../utils/Validator.js';
const initialError = {
  emailValid: true,
  passwordLength: true,
  passwordsMatch: true,
  completed: false,
  passwordDisabled: false,
};

export const Step1 = ({ credentials, handleNext, handleChange }) => {
  const [error, setError] = useState(initialError);

  const onNextClick = () => {
    if (credentials.completed) {
      handleNext(credentials);
    } else {
      const error = validateStep1(credentials);
      if (error.emailValid && error.passwordLength && error.passwordsMatch) {
        handleNext(credentials);
      } else {
        setError(error);
      }
    }
  };

  const onChange = (name, value) => {
    handleChange(name, value, 'step1');
    setError(initialError);
  };

  const nextEnabled = credentials.email !== '' && credentials.password !== '' && credentials.confirmPassword !== '';

  return (
    <div>
      <div className="max-w-md mx-auto text-center bg-white px-4">
        <header className="mb-4">
          <h1 className="text-2xl font-bold mb-1">Create Your Free Account</h1>
          <p className="text-[15px] text-slate-500">Enter your email and create a password to get started. We'll guide you through the rest of the process.</p>
        </header>
      </div>
      <Box display="flex" flexDirection="column" height="100%" justifyContent="space-between">
        <Box component="form" flex="1" display="flex" flexDirection="column" justifyContent="center" p={2} className="space-y-6">
          <TextField
            label="Email"
            id="email"
            type="email"
            name="email"
            error={!error.emailValid}
            helperText={!error.emailValid ? "Enter a valid Email" : ""}
            className="mt-1 px-3 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
            value={credentials.email}
            onChange={event => onChange("email", event.target.value)}
            disabled={credentials.completed}
          />
          <TextField
            label="Password"
            id="password"
            type="password"
            error={!error.passwordLength}
            helperText={!error.passwordLength ? "Password must be 8 characters" : ""}
            value={credentials.password}
            onChange={event => onChange("password", event.target.value)}
            disabled={credentials.passwordDisabled || credentials.completed}
            className="mt-1 px-3 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
          />
          <TextField
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            error={!error.passwordsMatch}
            helperText={!error.passwordsMatch ? "Password does not match" : ""}
            value={credentials.confirmPassword}
            disabled={credentials.passwordDisabled || credentials.completed}
            onChange={event => onChange("confirmPassword", event.target.value)}
            className="mt-1 px-3 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" p={2} alignItems="flex-end">
          <button type="submit" onClick={onNextClick} disabled={!nextEnabled}
            className={`inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 ${nextEnabled
              ? 'bg-indigo-500 hover:bg-indigo-600'
              : 'bg-indigo-300 cursor-not-allowed'
              }`}>
            Proceed
          </button>
        </Box>
      </Box>
    </div>
  );
};
