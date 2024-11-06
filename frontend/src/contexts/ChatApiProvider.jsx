import { createContext, useContext, useMemo } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthProvider.jsx';
import { actions as MessageActions } from '../slices/messagesSlice.js';
import { actions as ChannelsActions } from '../slices/channelsSlice.js';

export const ChatApiContext = createContext();
const getDataPath = '/api/v1/data';

export const ChatApiProvider = ({ socket, children }) => {
    const authContext = useContext(AuthContext);
    const token = authContext.userData !== null ? authContext.userData.token : '';
    const dispatch = useDispatch();

    const context = useMemo(() => {
        const getCoreChannelsData = async () => {
            const response = await axios.get(getDataPath, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // channels  [{id, name, removable}, {...}], messages [] currentChannelId number

            const { channels, messages, currentChannelId } = response.data;

            return { channels, messages, currentChannelId };
        };

        const addNewMessage = (message) => {
            socket.emit('newMessage', message, (response) => console.log(`response status for message sending: ${response.status}`));
        };

        const addNewChannel = async (channel) => {
            const response = await socket.emitWithAck('newChannel', channel);
            return response.data;
        };

        const deleteChannel = (channel) => {
            socket.emit('removeChannel', channel, (response) => console.log(`response status for channel deletion: ${response.status}`));
            toast('Канал удалён');
        };

        const renameChannel = (channel) => {
            socket.emit('renameChannel', channel, (response) => console.log(`response status for channel renaming: ${response.status}`));
            toast('Канал переименован');
        };

        const connectSocket = () => {
            socket.connect();

            socket.on('newMessage', (message) => {
                dispatch(MessageActions.addMessage(message));
            });

            socket.on('newChannel', (channel) => {
                dispatch(ChannelsActions.addChannel(channel));
            });

            socket.on('removeChannel', (channel) => {
                dispatch(ChannelsActions.deleteChannel(channel));
            });

            socket.on('renameChannel', (channel) => {
                dispatch(ChannelsActions.renameChannel(channel));
            });
        };

        const disconnectSocket = () => {
            socket.off();
            socket.disconnect();
        };

        return {
            connectSocket,
            disconnectSocket,

            getCoreChannelsData,
            addNewMessage,
            addNewChannel,
            deleteChannel,
            renameChannel,
        };
    }, [authContext, dispatch, socket]);

    return (
        <ChatApiContext.Provider value={context}>{children}</ChatApiContext.Provider>
    );
};
