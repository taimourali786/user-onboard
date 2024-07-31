import { useState, useContext } from "react";
import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

import Button from "../components/base/Button.jsx";


import { AuthContext } from '../utils/AuthContext.jsx';
const initialUser = {
    email: "abc@gmail.com",
    password: "********",
    preferences: {
        pref1: true,
        pref2: false,
        pref3: false,
        pref4: true,
        pref5: false
    }
}
export default function HomePage() {
    const { login, logout, authError, isAuthenticated } = useContext(AuthContext);
    const [user, setUser] = useState(initialUser);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    let preferenceCheckboxes = Object.values(user.preferences).map((prefKey, prefValue) => (
        <FormControlLabel
            key={prefKey}
            control={<Checkbox name={prefKey} checked={prefValue} disabled />}
            label={`${prefKey}`}
        />
    ));
    return (
        <>
            <main>
                <Typography>{user.email}</Typography>
                <Typography>{user.password}</Typography>
                {preferenceCheckboxes}

                <Button onClick={logout}>
                    Logout
                </Button>
            </main>
        </>
    )
}