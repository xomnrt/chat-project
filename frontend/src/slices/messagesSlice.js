import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [], // {id, body, username, timeSending, currentChannelId}
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {

        setMessagesInfo: (state, action) => {
            state.messages = action.payload;
        },

        addMessage: (state, action) => {
            // добавить проверку что сообщения такого нет
            // проверять по id
            if (state.messages.find((message) => message.id === action.payload.id) === undefined) {
                state.messages.push(action.payload);
            }

        },

        deleteMessages: (state, action) => {
            return state.messages.filter((message) => message.currentChannelId !== action.payload.id)
        }

    }
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
export const selectMessages = (state) => state.messages.messages;
