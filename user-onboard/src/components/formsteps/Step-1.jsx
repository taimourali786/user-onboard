import { useState } from 'react';
import { Button, Box, Typography, Snackbar, Alert } from '@mui/material';
import { validateStep1 } from '../../utils/Validator.js';
import FormField from './../base/FormField.jsx';
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
      handleNext();
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
    <Box display="flex" flexDirection="column" height="100%">
      <Box component="form" flex="1" display="flex" flexDirection="column" justifyContent="center" p={2} className="space-y-6">
        {/* <div>
          {(!error.emailValid || !error.passwordLength || !error.passwordsMatch) && (
            <Alert severity="error">{error.message}</Alert>
          )}
        </div> */}
        <FormField
          htmlFor="email"
          labelText="Email"
          id="email"
          type="email"
          name="email"
          isInvalid={!error.emailValid}
          value={formData.email}
          errorMessage="Enter a valid Email"
          handleChange={event => handleChange("email", event.target.value)}
          errorStyle={{ borderColor: 'red' }}
          errorCaptionStyle={{ color: 'red', height: '20px', visibility: error.emailValid ? 'hidden' : 'visible' }}
        />
        <FormField
          htmlFor="password"
          labelText="Password"
          id="password"
          type="password"
          isInvalid={!error.passwordLength}
          errorMessage="Password must be 8 characters"
          value={formData.password}
          handleChange={event => handleChange("password", event.target.value)}
          errorStyle={{ borderColor: 'red' }}
          errorCaptionStyle={{ color: 'red', height: '20px', visibility: error.passwordLength ? 'hidden' : 'visible' }}
        />
        {/* <Typography variant='caption' style={{ marginTop: '5px', height: '20px' }} className="text-sm text-gray-500 mt-1">Password must be at least 8 characters</Typography> */}
        <FormField
          labelText="Confirm Password"
          type="password"
          isInvalid={!error.passwordsMatch}
          errorMessage="Password does not match"
          value={formData.confirmPassword}
          handleChange={event => handleChange("confirmPassword", event.target.value)}
          errorStyle={{ borderColor: 'red' }}
          errorCaptionStyle={{ color: 'red', height: '20px', visibility: error.passwordsMatch ? 'hidden' : 'visible' }}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <CustomButton
          variant="contained"
          onClick={onNextClick}
          disabled={!nextEnabled}
        >
          Next
        </CustomButton>
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
  );
};

export default Step1;