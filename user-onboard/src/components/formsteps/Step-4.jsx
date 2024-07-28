import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";
import { useState } from "react";

const Step4 = ({ userData, handleNext }) => {
    const [preferences, setPreferences] = useState(userData);


    const handleCheckChanged = (event) => {
        setPreferences(prevValues => 
        ({
            ...prevValues,
            [event.target.name]: event.target.checked
        })
        )
    }
    const onNextClick = () => {
        handleNext();
    }
    let preferenceCheckboxes = Object.keys(preferences).map((prefKey) => (
        <FormControlLabel
            key={prefKey}
            control={<Checkbox name={prefKey} onChange={handleCheckChanged} />}
            label={`${prefKey}`}
        />
    ));
    // for(const pref in preference.values){
    //     console.log(pref);
    //     let prefe = <FormControlLabel control={<Checkbox name={pref.key} onChange={handleCheckChanged} />} label={pref.key} />   
    //     preferenceCheckboxes.push(prefe);       
    // }
    return (
        <>
            <Typography> Select User Preferences</Typography>
            <Box>
                <FormGroup>
                    {
                     preferenceCheckboxes   
                    }
                </FormGroup>
            </Box>
            <Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onNextClick}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Next
                </Button>
            </Box >
        </>
    )
}
export default Step4;