import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [], // [ {id, text, author, time, channelId}, {} ]
};


const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        showState: (state) => {
            console.log(state);
        },

    },
});


export const { showState, setMessagesInfo } = messagesSlice.actions;
export default messagesSlice.reducer;
export const selectMessage = (state) => state.messages;
