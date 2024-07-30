import { useState } from 'react';
import { Button, Box, Snackbar, Alert, TextField } from '@mui/material';
import { validateStep1 } from '../../utils/Validator.js';
import { styled } from '@mui/material/styles';

const initialError = {
  emailValid: true,
  passwordLength: true,
  passwordsMatch: true,
  message: ""
};

const CustomButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(1.5, 4),
  border: '1px solid transparent',
  borderRadius: '0.375rem',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  fontSize: '0.875rem',
  fontWeight: '500',
  color: theme.palette.common.white,
  backgroundColor: '#4F46E5',
  maxHeight: '40px',
  maxWidth: '80px',
  '&:hover': {
    backgroundColor: '#4338CA',
  },
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.5)',
  },
  width: 'auto',
}));

const Step1 = ({ userData, handleNext }) => {
  const [formData, setFormData] = useState(userData);
  const [error, setError] = useState(initialError);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const onNextClick = () => {
    const error = validateStep1(formData);
    if (error.emailValid && error.passwordLength && error.passwordsMatch) {
      handleNext(formData);
    } else {
      setError(error);
      setSnackbarOpen(true);
    }
  };

  const handleChange = (name, value) => {
    setFormData(prevValues => ({
      ...prevValues,
      [name]: value
    }));
    setError(initialError);
  };

  const nextEnabled = formData.email !== '' && formData.password !== '' && formData.confirmPassword !== '';

  return (
    <div>
    <div>
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
          value={formData.email}
          onChange={event => handleChange("email", event.target.value)}
        />
        <TextField
          label="Password"
          id="password"
          type="password"
          error={!error.passwordLength}
          helperText={!error.passwordLength ? "Password must be 8 characters" : ""}
          value={formData.password}
          onChange={event => handleChange("password", event.target.value)}
          className="mt-1 px-3 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
        />
        <TextField
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          error={!error.passwordsMatch}
          helperText={!error.passwordsMatch ? "Password does not match" : ""}
          value={formData.confirmPassword}
          onChange={event => handleChange("confirmPassword", event.target.value)}
          className="mt-1 px-3 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" p={2} alignItems="flex-end">
        <button type="submit" onClick={onNextClick} disabled={!nextEnabled}
          className="inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150">
            Proceed
        </button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: '300px' }}>
          {error.message}
        </Alert>
      </Snackbar>
    </Box>
    </div>
  );
};

export default Step1;
