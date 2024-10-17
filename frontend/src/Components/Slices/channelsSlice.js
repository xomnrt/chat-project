import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ids: [],
    channelById: {},
};

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        showState: (state) => {
            console.log(state);
        },

        setChannelsInfo: (state, action) => {
            return {
                ids: action.payload.map((channel) => channel.id), // [{name, id, ...}]
                channelById: Object.fromEntries(action.payload.map((channel) => [channel.id, channel])),
            }
        }
    },
});


export const { showState, setChannelsInfo } = channelsSlice.actions;
export default channelsSlice.reducer;
export const selectChannels = (state) => state.channels.ids.map((id) => state.channels.channelById[id]);
const selectChannelById = (id) => (state) => state.channels.channelById[id]
