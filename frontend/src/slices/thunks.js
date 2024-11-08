/* eslint-disable indent */
import { createAsyncThunk } from '@reduxjs/toolkit';

const getInitialData = createAsyncThunk(
    'getInitialData',
    async (getCoreData, { rejectWithValue }) => {
        try {
            const response = await getCoreData();
            if (response.status !== 200) throw new Error('Failed to fetch data');
            return response.data;
        } catch (e) {
            if (e.isAxiosError) return rejectWithValue(e.response.status);
            throw new Error(`Error: ${e.message}`);
        }
    },
);

export default getInitialData;
