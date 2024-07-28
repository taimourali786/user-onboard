


import { Button, TextField, Box, Typography, Grid } from '@mui/material';
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
const Step6 = ({ userData, handleNext }) => {
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
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };
    const handleUpload = () => {
        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }
        console.log(previewUrl)
        console.log('Uploading file:', selectedFile);
    };
    const nextEnabled = formData.cardNumber !== "" && formData.expiry !== "" && formData.cvv !== ""
        && formData.name !== "" && formData.address !== "";
    return (
        <Box component="form" noValidate autoComplete="off" sx={{ p: 2 }}>
            <Box mt={2}>
                <Typography>Upload Profile Picture</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Input
                            fullWidth
                            type="file"
                            accept="image/*"
                            margin="normal"
                            variant="outlined"
                            onChange={handleFileChange}
                        // error={!error.cardValid}
                        // helperText={!error.cardValid ? "Invalid Card" : ""}
                        // onChange={event => handleChange("card", event.target.value)}
                        // value={formData.cardNumber}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUpload}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Upload
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Box className="mb-2">
                <img src={previewUrl} alt="Selected" style={{ maxWidth: '300px', maxHeight: '300px' }} />
            </Box>
            <Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onNextClick}
                    disabled={!nextEnabled}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </Button>
            </Box >
        </Box>
    );
}

export default Step6;