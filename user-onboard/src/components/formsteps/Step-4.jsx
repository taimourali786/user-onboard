import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const Step4 = () => {
    const handleCheckChanged = (event) => {
        console.log("Check Changed", event.target.name);
    }
    return (
        <>
            <Typography> Select User Preferences</Typography>
            <Box>
                <FormGroup>
                    <FormControlLabel control={<Checkbox name="1" onChange={handleCheckChanged}/>} label="Preference One" />
                    <FormControlLabel control={<Checkbox name="2" onChange={handleCheckChanged}/>} label="Preference Two" />
                    <FormControlLabel control={<Checkbox name="3" onChange={handleCheckChanged}/>} label="Preference Three" />
                    <FormControlLabel control={<Checkbox name="4" onChange={handleCheckChanged}/>} label="Preference Four" />
                    <FormControlLabel control={<Checkbox name="5" onChange={handleCheckChanged}/>} label="Preference Five" />
                    <FormControlLabel control={<Checkbox name="6" onChange={handleCheckChanged}/>} label="Preference Six" />
                    <FormControlLabel control={<Checkbox name="7" onChange={handleCheckChanged}/>} label="Preference Seven" />
                </FormGroup>
            </Box>
        </>
    )
}
export default Step4;