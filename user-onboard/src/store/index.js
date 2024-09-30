import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './user';
import { loadingReducer } from './loading';
import { errorReducer } from './error';

const store = configureStore({
    reducer: {
        user: userReducer,
        loading: loadingReducer,
        error: errorReducer

    }
})

export default store;