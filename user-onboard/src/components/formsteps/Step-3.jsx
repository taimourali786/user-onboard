import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import Input from '../base/Input';
import { validateStep3 } from '../../utils/Validator.js';

const initialError = {
    dobValid: true,
    address1Valid: true,
    address2Valid: true,
    cityValid: true,
    countryValid: true,
    message: ""
}

const Step3 = ({ credentials, handleNext, handleChange }) => {
    const [error, setError] = useState(initialError);

    const onNextClick = (event) => {
        event.preventDefault();
        const error = validateStep3(credentials);
        if (error.dobValid
            && error.address1Valid
            && error.address2Valid
            && error.cityValid
            && error.countryValid
        ) {
            handleNext(credentials);
        } else {
            setError(error);
        }
    }
    const onChange = (name, value) => {
        handleChange(name, value, 'step3')
        setError(initialError);
    }
    const nextEnabled = credentials.dob !== "" && credentials.address1 !== "" && credentials.address2 !== ""
        && credentials.city !== "" && credentials.country !== "";
    return (<>
        <div>
            <Box component="form" noValidate autoComplete="off" sx={{ p: 2 }}>
                <Input fullWidth
                    label="Date Of Birth"
                    type="date"
                    margin="normal"
                    variant="outlined"
                    value={credentials.dob}
                    error={!error.dobValid}
                    helperText={!error.dobValid ? "Enter valid date of birth" : ""}
                    onChange={event => onChange("dob", event.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Box>
                    <Input
                        fullWidth
                        label="Address 1"
                        type="text"
                        margin="normal"
                        variant="outlined"
                        value={credentials.address1}
                        onChange={event => onChange("address1", event.target.value)}
                        error={!error.address1Valid}
                        helperText={!error.address1Valid ? "Enter valid address" : ""}
                    />
                    <Input
                        fullWidth
                        label="Address 2"
                        type="text"
                        margin="normal"
                        variant="outlined"
                        error={!error.address2Valid}
                        helperText={!error.address2Valid ? "Enter valid address" : ""}
                        value={credentials.address2}
                        onChange={event => onChange("address2", event.target.value)}

                    />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Input
                                fullWidth
                                label="City"
                                type="text"
                                margin="normal"
                                variant="outlined"
                                error={!error.cityValid}
                                helperText={!error.cityValid ? "Enter valid City" : ""}
                                value={credentials.city}
                                onChange={event => onChange("city", event.target.value)}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Input
                                fullWidth
                                label="Country"
                                type="text"
                                margin="normal"
                                variant="outlined"
                                error={!error.countryValid}
                                helperText={!error.countryValid ? "Enter valid country" : ""}
                                value={credentials.country}
                                onChange={event => onChange("country", event.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box display="flex" justifyContent="flex-end" mt={2} alignItems="flex-end">
                    <button
                        type="button"
                        onClick={onNextClick}
                        disabled={!nextEnabled}
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
    </>
    );

}

export default Step3;