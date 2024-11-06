import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: undefined,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {

    setChannelsInfo: (state, action) => ({ ...state, channels: action.payload }),

    setCurrentChannelId: (state, action) => ({ ...state, currentChannelId: action.payload }),

    addChannel: (state, action) => {
      if (state.channels.find((channel) => channel.id === action.payload.id)) {
        return state;
      }

      return { ...state, channels: [...state.channels, action.payload] };
    },

    deleteChannel: (state, action) => ({
      ...state,
      channels: state.channels.filter((channel) => channel.id !== action.payload.id),
    }),

    renameChannel: (state, action) => {
      const newName = action.payload.name;
      const channelId = action.payload.id;

      const channelToChange = state.channels.find((channel) => channel.id === channelId);
      channelToChange.name = newName;
    },

  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
export const selectChannels = (state) => state.channels.channels;
export const selectCurrentChannel = (state) => state.channels.channels.find(
  (channel) => channel.id === state.channels.currentChannelId,
);
export const selectCurrentChannelId = (state) => state.channels.currentChannelId;

// const selectChannelById = (id) => (state) => state.channels.channelById[id]
