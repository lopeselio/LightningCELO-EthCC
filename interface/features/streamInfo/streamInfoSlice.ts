import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface connectState {
    id: number,
    nextId: number
}

const initialState: connectState = {
    id: 100000,
    nextId: 100000
};

const connectSlice = createSlice({
    name: 'stream_info',
    initialState,
    reducers: {
        setId: (state, action: PayloadAction<number>) => {
            state.id = action.payload
        },
        setNextId: (state, action: PayloadAction<number>) => {
            state.id = action.payload
        },
    }
});

export const {
    setId,
    setNextId,
} = connectSlice.actions;

export default connectSlice