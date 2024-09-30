import { createSlice } from '@reduxjs/toolkit';

// Holds user Information and Registration Information

const initialUser = {
    step1: {
        email: "",
        password: "",
        confirmPassword: "",
        completed: false,
        passwordDisabled: false
    },
    step2: {
        completed: false
    },
    step3: {
        dob: new Date().toJSON().slice(0, 10),
        address1: "b",
        address2: "b",
        city: "b",
        country: "b"
    },
    step4: {},
    step5: {
        cardNumber: "",
        expiry: "",
        name: "",
    },
    step6: {}
}

const initialState = {
    isAuthenticated: false,
    user: initialUser,
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            // action payload should have user
            state.isAuthenticated = true,
                state.user = { ...action.payload.user }
        },
        resetUser(state) {
            state.user = { ...initialUser }
            state.isAuthenticated = false;
        }
    }

})

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;