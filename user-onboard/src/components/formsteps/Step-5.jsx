import { Button, Box, Grid } from '@mui/material';
import Input from '../base/Input';
import { useState } from 'react';

const initialError = {
    cardValid: true,
    expiryValid: true,
    cvvValid: true,
    nameValid: true,
    addressValid: true,
    message: ""
}
const Step5 = ({ userData, handleNext }) => {
    const [formData, setFormData] = useState(userData);
    const [error, setError] = useState(initialError);

    const onNextClick = () => {
        const error = validateStep5(formData);
        if (error.cardValid
            && error.expiryValid
            && error.cvvValid
            && error.nameValid
            && error.addressValid
        ) {
            handleNext();
        } else {
            setError(error);
        }
    }
    const handleChange = (name, value) => {
        setFormData(prevValues =>
        ({
            ...prevValues,
            [name]: value
        }));
        setError(initialError);
    }
    const nextEnabled = formData.cardNumber !== "" && formData.expiry !== "" && formData.cvv !== ""
        && formData.name !== "" && formData.address !== "";
    return (
        <Box component="form" noValidate autoComplete="off" sx={{ p: 2 }}>
            <Box mt={2}>
                <Input
                    fullWidth
                    label="Card Number"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    error={!error.cardValid}
                    helperText={!error.cardValid ? "Invalid Card" : ""}
                    onChange={event => handleChange("card", event.target.value)}
                    value={formData.cardNumber}
                />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Input
                            fullWidth
                            label="Expiry: mm/yy"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            error={!error.expiryValid}
                            helperText={!error.expiryValid ? "Invalid Expiry" : ""}
                            onChange={(event => handleChange("expiry", event.target.value))}
                            value={formData.expiry}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Input
                            fullWidth
                            label="CVV"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            error={!error.cvvValid}
                            helperText={!error.cvvValid ? "Invalid CVV" : ""}
                            onChange={(event => handleChange("cvv", event.target.value))}
                            value={formData.cvv}
                        />
                    </Grid>
                </Grid>
                <Input
                    fullWidth
                    label="Name"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    error={!error.nameValid}
                    helperText={!error.nameValid ? "Invalid Name" : ""}
                    onChange={(event => handleChange("name", event.target.value))}
                    value={formData.name}
                />
                <Input
                    fullWidth
                    label="Address"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    error={!error.addressValid}
                    helperText={!error.addressValid ? "Invalid Name" : ""}
                    onChange={(event => handleChange("address", event.target.value))}
                    value={formData.address}
                />
            </Box>
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
        </Box>
    );
}

export default Step5;