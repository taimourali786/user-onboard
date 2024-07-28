import { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';

const Step2 = ({ handleOtp, handleValidateOtp, handleNext }) => {
  const [sendOtp, setSendOtp] = useState(false);
  const [isValidated, setValidated] = useState(false);

  const onSendOtp = () => {
    setSendOtp(true);
    // handleOtp();
  }
  const onValidate = (value) => {
    // const validated = handleValidateOtp(value);
    setValidated(true);
  }

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ p: 2 }}>
      <TextField
        fullWidth
        label="OTP"
        margin="normal"
        variant="outlined"
        disabled={!sendOtp}
        className="mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
      />
      <h6><i>TODO: display timer here..</i></h6>
      <Box mt={2}>
        {!sendOtp ?
          <Button
            variant="contained"
            color="primary"
            onClick={onSendOtp}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send OTP
          </Button>
          : (isValidated
            ? <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Next
            </Button>
            : <Button
              variant="contained"
              color="primary"
              onClick={onValidate}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Verify
            </Button>)}

      </Box>
    </Box>
  );
};

export default Step2;
