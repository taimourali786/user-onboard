import { Box, Grid } from '@mui/material';
import Input from '../base/Input';
import { useState } from 'react';
import { validateStep5 } from '../../utils/Validator.js';


const initialError = {
    cardValid: true,
    expiryValid: true,
    nameValid: true,
    message: ""
}
const Step5 = ({ credentials, handleNext, handleChange }) => {
    const [error, setError] = useState(initialError);

    const onNextClick = (event) => {
        event.preventDefault();
        const error = validateStep5(credentials);
        if (error.cardValid
            && error.expiryValid
            && error.nameValid
        ) {
            handleNext();
        } else {
            setError(error);
        }
    }
    const onChange = (name, value) => {
        handleChange(name, value, 'step5')
        setError(initialError);
    }
    const nextEnabled = credentials.cardNumber !== "" && credentials.expiry !== "" && credentials.name !== "";
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
                <div className="bg-white px-6 py-4 shadow-lg">
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
                                onChange={event => onChange("cardNumber", event.target.value)}
                                value={credentials.cardNumber}
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Input
                                        fullWidth
                                        label="Expiry: MM/YY"
                                        type="text"
                                        margin="normal"
                                        variant="outlined"
                                        error={!error.expiryValid}
                                        helperText={!error.expiryValid ? "Invalid Expiry" : ""}
                                        onChange={(event => onChange("expiry", event.target.value))}
                                        value={credentials.expiry}
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
                                        onChange={(event => onChange("name", event.target.value))}
                                        value={credentials.name}
                                    />
                                </Grid>
                            </Grid>
                            </Box>
                            <Box display="flex" justifyContent="flex-end" mt={2} alignItems="flex-end">
                                <button onClick={onNextClick} disabled={!nextEnabled}
                                    className={`inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 ${
                                        nextEnabled 
                                          ? 'bg-indigo-500 hover:bg-indigo-600' 
                                          : 'bg-indigo-300 cursor-not-allowed'
                                      }`}>
                                        Next
                                </button>
                            </Box>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default Step5;