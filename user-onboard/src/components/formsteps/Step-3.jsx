import { Button, TextField, Box, Typography, Grid } from '@mui/material';
import Input from '../base/Input';
import { useState } from 'react';
import { validateStep3 } from '../../utils/Validator.js';

const initialError = {
    dobValid: true,
    address1Valid: true,
    address2Valid: true,
    cityValid: true,
    countryValid: true,
    message: ""
}

const Step3 = ({ userData, handleNext }) => {

    const [formData, setFormData] = useState(userData);
    const [error, setError] = useState(initialError);

    const onNextClick = () => {
        const error = validateStep3(formData);
        if (error.dobValid
            && error.address1Valid
            && error.address2Valid
            && error.cityValid
            && error.countryValid
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
    const nextEnabled = formData.dob !== "" && formData.address1 !== "" && formData.address2 !== ""
        && formData.city !== "" && formData.country !== "";
    return (<>
        {
            (!error.dobValid
                && !error.address1Valid
                && !error.address2Valid
                && !error.cityValid
                && !error.countryValid) ? <Alert severity="error"> {error.message} </Alert> : ""
        }
        <Box component="form" noValidate autoComplete="off" sx={{ p: 2 }}>
            <Input fullWidth
                label="Date Of Birth"
                type="date"
                margin="normal"
                variant="outlined"
                value={formData.dob}
                error={false}
                onChange={event => handleChange("dob", event.target.value)}
            />
            <Box mt={2}>
                <Typography>Home Address</Typography>
                <Input
                    fullWidth
                    label="Address1"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    error={false}
                    value={formData.address1}
                    onChange={event => handleChange("address1", event.target.value)}

                />
                <Input
                    fullWidth
                    label="Address2"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    error={false}
                    value={formData.address2}
                    onChange={event => handleChange("address2", event.target.value)}

                />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Input
                            fullWidth
                            label="City"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            error={false}
                            value={formData.city}
                            onChange={event => handleChange("city", event.target.value)}

                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Input
                            fullWidth
                            label="Country"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            error={false}
                            value={formData.country}
                            onChange={event => handleChange("country", event.target.value)}
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
    </>
    );

}

export default Step3;