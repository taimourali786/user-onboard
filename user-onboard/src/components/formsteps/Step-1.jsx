import { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import Input from "../base/Input.jsx";
import Alert from '@mui/material/Alert';
import { validateStep1 } from '../../utils/Validator.js';

const initialError =     {
  emailValid: true,
  passwordLength: true,
  passwordsMatch: true,
  message: ""
};
const Step1 = ({ userData, handleNext }) => {

  const [formData, setFormData] = useState(userData);
  const [error, setError] = useState(initialError);

  const onNextClick = () => {
    let error = validateStep1(formData);
    if (error.emailValid && error.passwordLength && error.passwordsMatch) {
      handleNext();
    } else {
      setError(error)
    }
  }

  const handleChange = (name, value) => {
    setFormData(prevValues =>
    ({
      ...prevValues,
      [name]: value
    })
    );
    setError(initialError);
  }
  const nextEnabled = formData.email !== '' && formData.password !== '' && formData.confirmPassword !== '';
  return (
    <>
      {(!error.emailValid || !error.passwordLength || !error.passwordsMatch) && <Alert severity="error"> {error.message} </Alert>}
      <Box component="form" noValidate autoComplete="off" sx={{ p: 2 }}>
        <Input
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          variant="outlined"
          error={!error.emailValid}
          helperText={error.emailValid ? "" : "Enter a valid Email"}
          value={formData.email}
          onChange={event => handleChange("email", event.target.value)}
        />
        <Input
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          variant="outlined"
          value={formData.password}
          error={!error.passwordsMatch || !error.passwordLength}
          helperText={!error.passwordLength ? "Password Must be 8 characters" : !error.passwordsMatch ? "Password Does not match" : ""}
          onChange={event => handleChange("password", event.target.value)}
        />
        <Typography>Password must be 8 characters</Typography>
        <Input
          fullWidth
          label="Confirm Password"
          type="password"
          margin="normal"
          variant="outlined"
          error={!error.passwordsMatch || !error.passwordLength}
          helperText={!error.passwordLength ? "Password Must be 8 characters" : !error.passwordsMatch ? "Password Does not match" : ""}
          value={formData.confirmPassword}
          onChange={event => handleChange("confirmPassword", event.target.value)}
        />
      </Box >
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={onNextClick}
          disabled={!nextEnabled}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Next
        </Button>
      </Box >
    </>
  );
};

export default Step1;
