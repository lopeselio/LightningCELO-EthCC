import { configureStore } from '@reduxjs/toolkit'
import connectSlice from '../features/connect/connectSlice'
import streamInfoSlice from '../features/streamInfo/streamInfoSlice'

const store = configureStore({
    reducer: {
        connect: connectSlice.reducer,
        stream_info: streamInfoSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;