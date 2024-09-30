import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: 'loading',
    initialState: { loading: false },
    reducers: {
        startLoading(state) {
            state.loading = true
        },
        stopLoading(state) {
            state.loading = false
        }
    }
})

export const loadingActions = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;