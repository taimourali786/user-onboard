import { useState } from 'react';
import { Button, TextField, Grid, Box } from '@mui/material';
import PropTypes from 'prop-types';
import Input from "../Input.jsx";


const Step1 = ({ handleNext, stepOneData }) => {

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ p: 2 }}>
      <Input
        fullWidth
        label="Email"
        type="email"
        margin="normal"
        variant="outlined"
        error={false}
      />
      <Input
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        variant="outlined" />
      <Input
        fullWidth
        label="Confirm Password"
        type="password"
        margin="normal"
        variant="outlined" />
    </Box >
  );
};

Step1.propTypes = {
  handleNext: PropTypes.func.isRequired,
};


export default Step1;
