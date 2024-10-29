import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    channels: [],
    // [{ id, name, removable }, {...}]
    currentChannelId: undefined,
}

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {

        setChannelsInfo: (state, action) => {
            state.channels = action.payload;
        },

        setCurrentChannelId: (state, action) => {
            state.currentChannelId = action.payload;
        },

        addChannel: (state, action) => {
            state.channels.push(action.payload);
        },

        deleteChannel: (state, action) => {
            return state.channels.filter((channel) => channel.id !== action.payload.id)
        },

        // renameChannel: (state, action) => {

        // }

    }
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
export const selectChannels = (state) => state.channels.channels;
export const selectCurrentChannel = (state) => state.channels.channels.find((channel) => channel.id === state.channels.currentChannelId);
export const selectCurrentChannelId = (state) => state.channels.currentChannelId

// const selectChannelById = (id) => (state) => state.channels.channelById[id]
