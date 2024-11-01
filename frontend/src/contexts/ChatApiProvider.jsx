import { createContext, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthProvider.jsx';
import { useDispatch } from 'react-redux';
import { actions as MessageActions } from "../slices/messagesSlice.js";
import { actions as ChannelsActions } from '../slices/channelsSlice.js'


export const ChatApiContext = createContext();
const getDataPath = '/api/v1/data'

export const ChatApiProvider = ({socket, children }) => {

    const authContext = useContext(AuthContext);
    const token = authContext.userData !== null ? authContext.userData.token : '';
    const dispatch = useDispatch();

    const getCoreChannelsData = async () => {
        const response = await axios.get(getDataPath, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

        //channels  [{id, name, removable}, {...}], messages [] currentChannelId number

        const {channels, messages, currentChannelId } = response.data;

        return {channels, messages, currentChannelId };
    }

    const addNewMessage = (message) => {
        socket.emit('newMessage', message, (response) => console.log(`response status for message sending: ${response.status}`));
    }

    const addNewChannel = (channel) => {
        socket.emit('newChannel', channel, (response) => console.log(`response status for channel creation: ${response.status}`));
    }

    const deleteChannel = (channel) => {
        socket.emit('removeChannel', channel, (response) => console.log(`response status for channel deletion: ${response.status}`));
    }

    const renameChannel = (channel) => {
        socket.emit('renameChannel', channel, (response) => console.log(`response status for channel renaming: ${response.status}`));
    }

    const connectSocket = () => {
        socket.connect();

        socket.on('newMessage', (message) => {
            dispatch(MessageActions.addMessage(message));
          });

        socket.on("newChannel", (channel) => {
            dispatch(ChannelsActions.addChannel(channel))

        })

        socket.on("removeChannel", (channel) => {
            dispatch(ChannelsActions.deleteChannel(channel));

        })

        socket.on("renameChannel", (channel) => {
            dispatch(ChannelsActions.renameChannel(channel))
        })

    }

    const disconnectSocket = () => {
        socket.off();
        socket.disconnect();
      };

    const context = {
        connectSocket,
        disconnectSocket,

        getCoreChannelsData,
        addNewMessage,
        addNewChannel,
        deleteChannel,
        renameChannel
    }

    return (
        <ChatApiContext.Provider value={context}>{children}</ChatApiContext.Provider>
    )
}
