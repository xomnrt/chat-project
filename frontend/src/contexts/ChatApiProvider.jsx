import { createContext, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthProvider.jsx';

export const ChatApiContext = createContext();
const getDataPath = '/api/v1/data'

export const ChatApiProvider = ({ children }) => {

    const authContext = useContext(AuthContext);
    const token = authContext.userData !== null ? authContext.userData.token : '';

    const getCoreChannels = async () => {
        const response = await axios.get(getDataPath, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

        //channels  [{id, name, removable}, {...}], messages [] currentChannelId number

        const {channels, messages, currentChannelId } = response.data;

        return {channels, messages, currentChannelId };
    }

    const context = {
        getCoreChannelsData: getCoreChannels,
    }

    return (
        <ChatApiContext.Provider value={context}>{children}</ChatApiContext.Provider>
    )
}
