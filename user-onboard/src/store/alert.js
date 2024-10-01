import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        style: '',
        content: { status: null, message: null },
    },
    reducers: {
        setAlert(state, action) {
            state.style = action.payload.alert.type
            state.content.status = action.payload.alert.status
            state.content.message = action.payload.alert.message
        },
        resetAlert(state) {
            state.style = ''
            state.content.status = null
            state.content.message = null
        }
    }
})

export const alertActions = alertSlice.actions;
export const alertReducer = alertSlice.reducer