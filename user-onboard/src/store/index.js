import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './user';
import { loadingReducer } from './loading';
import { alertReducer } from './alert';

const store = configureStore({
    reducer: {
        user: userReducer,
        loading: loadingReducer,
        alert: alertReducer

    }
})

export default store;