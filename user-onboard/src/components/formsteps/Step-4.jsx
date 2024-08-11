import { Box, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

export const Step4 = ({ credentials, preferences, handleNext }) => {
    const [userPreferences, setUserPreferences] = useState(credentials);
    const handleCheckChanged = (key, checked) => {
        setUserPreferences(prevValues => ({
            ...prevValues,
            [key]: checked
        }));
    }

    const onNextClick = (event) => {
        event.preventDefault();
        const list = [];
        Object.values(preferences).map(v => {
            
            const obj = {preferenceId: v.preferenceId};

            if(userPreferences[v.preferenceId] !== undefined ){
                obj.preferenceValue = userPreferences[v.preferenceId];
            } else{
                obj.preferenceValue = false;
            }
            list.push(obj);
        })
        handleNext(list);
    }
    let preferenceCheckboxes = Object.keys(preferences).map(p => {
        const pref = preferences[p];
        const checked = userPreferences[pref.preferenceId] !== undefined ? userPreferences[pref.preferenceId] : false;
        return <FormControlLabel
            key={pref.preferenceId}

            control={
                <Checkbox
                    key={pref.preferenceId}
                    name={pref.preferenceName}
                    onChange={event => handleCheckChanged(pref.preferenceId, event.target.checked)}
                    checked={checked}
                />
            }
            label={pref.preferenceName}
        />
    }
    );

    return (
        <div>
            <div className="max-w-md mx-auto text-center bg-white px-4">
                <header className="mb-4">
                    <h1 className="text-2xl font-bold mb-1">Select User Preferences</h1>
                    <p className="text-[15px] text-slate-500">Choose your preferences to personalize your experience.</p>
                </header>
            </div>
            <Box component="form" noValidate autoComplete="off" sx={{ p: 2 }}>
                <FormGroup>
                    {preferenceCheckboxes}
                </FormGroup>
                <Box display="flex" justifyContent="flex-end" mt={2} alignItems="flex-end">
                    <button
                        type="button"
                        onClick={onNextClick}
                        className="inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                    >
                        Next
                    </button>
                </Box>
            </Box>
        </div>
    );
}
