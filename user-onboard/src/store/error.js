import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";

const errorSlice = createSlice({
    name: 'error',
    initialState: { status: null, message: null },
    reducers: {
        setError(state, action) {
            state.status = action.payload.error.status
            state.message = action.payload.error.message
        },
        resetError(state) {
            state.status = null
            state.message = null
        }
    }
})
export const errorActions = errorSlice.actions;
export const errorReducer = errorSlice.reducer