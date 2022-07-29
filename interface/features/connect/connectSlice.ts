import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface connectState {
    account: string,
    connected: boolean,
    chainId?: number,
}

const initialState: connectState = {
    account: '',
    connected: false,
    chainId: 0,
};

const connectSlice = createSlice({
    name: 'connect',
    initialState,
    reducers: {
        setAccount: (state, action: PayloadAction<string>) => {
            state.account = action.payload
        },
        setChainId: (state, action: PayloadAction<number>) => {
            state.chainId = action.payload
        },
        setConnected: (state, action: PayloadAction<boolean>) => {
            state.connected = action.payload
        },
    }
});

export const {
    setChainId,
    setConnected
} = connectSlice.actions;

export default connectSlice