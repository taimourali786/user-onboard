import { Button, TextField, Box, Typography, Grid } from '@mui/material';
import Input from '../base/Input';

const Step3 = () => {
    return (
        <Box component="form" noValidate autoComplete="off" sx={{ p: 2 }}>
            <Input fullWidth
                label="Date Of Birth"
                type="date"
                margin="normal"
                variant="outlined"
                error={false} />


            <Box mt={2}>
                <Typography>Home Address</Typography>
                <Input
                    fullWidth
                    label="Address1"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    error={false}
                />
                <Input
                    fullWidth
                    label="Address2"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    error={false}
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
                        />
                    </Grid>

                </Grid>
            </Box>
        </Box>
    );
}

export default Step3;