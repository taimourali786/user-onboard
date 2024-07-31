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
        <div>
            <div className="bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-500 rounded-lg overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                    <div className="flex justify-between items-center">
                        <img className="h-8" src="https://www.svgrepo.com/show/499847/company.svg" alt="Workflow logo"/>
                        <span className="font-medium text-gray-600">05/24</span>
                    </div>
                    <div className="mt-4">
                        <div className="font-bold text-gray-800 text-xl">**** **** **** 1234</div>
                        <div className="flex justify-between items-center mt-2">
                            <div className="text-sm text-gray-600">Card Holder Name</div>
                            <img className="h-10 w-10" src="https://www.svgrepo.com/show/362011/mastercard.svg" alt="Mastercard logo"/>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 px-6 py-4">
                    <Box component="form" noValidate autoComplete="off" sx={{}}>
                        <Box>
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
                                        label="Name"
                                        type="text"
                                        margin="normal"
                                        variant="outlined"
                                        error={!error.nameValid}
                                        helperText={!error.nameValid ? "Invalid Name" : ""}
                                        onChange={(event => handleChange("name", event.target.value))}
                                        value={formData.name}
                                    />
                                </Grid>
                            </Grid>
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
                </div>
            </div>
        </div>
    );
}

export default Step5;