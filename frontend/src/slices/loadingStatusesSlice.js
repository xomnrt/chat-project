/* eslint-disable indent */

import { createSlice } from '@reduxjs/toolkit';
import getInitialData from './thunks.js';

const initialState = {
    loadingStatus: 'idle',
};

const loadingStatusesSlice = createSlice({
    name: 'loadingStatus',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getInitialData.pending, (state) => ({ ...state, loadingStatus: 'loading' }))
            .addCase(getInitialData.fulfilled, (state) => ({ ...state, loadingStatus: 'succeeded' }))
            .addCase(getInitialData.rejected, (state, action) => ({
                ...state,
                loadingStatus: action.payload === 401 ? 'authorizationError' : 'failed',
            }));
    },
});

export const { actions } = loadingStatusesSlice;
export default loadingStatusesSlice.reducer;
export const selectLoadingStatus = (state) => state.loadingStatus;
