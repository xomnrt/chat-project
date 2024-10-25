import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [], // {id, body, author, timeSending}
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {

        setMessagesInfo: (state, action) => {
            state.messages = action.payload;
        },

    }
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
export const selectMessages = (state) => state.messages;
