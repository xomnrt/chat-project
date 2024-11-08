import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { actions as ChannelsActions } from '../../slices/channelsSlice.js';
import { actions as MessageActions } from '../../slices/messagesSlice.js';

import { ChatApiContext } from '../../contexts/ChatApiProvider.jsx';
import ModalWindow from './Modals/Modal.jsx';

import ChannelsView from './Channels.jsx';
import MessagesView from './Messages.jsx';

const ChatView = () => {
  const dispatch = useDispatch();
  const chatApiContext = useContext(ChatApiContext);

  useEffect(() => {
    (async () => {
      chatApiContext.connectSocket();

      const { channels, messages, currentChannelId } = await chatApiContext.getCoreChannelsData();
      dispatch(ChannelsActions.setChannelsInfo(channels));
      dispatch(ChannelsActions.setCurrentChannelId(currentChannelId));
      dispatch(MessageActions.setMessagesInfo(messages));
    })();

    return () => {
      chatApiContext.disconnectSocket();
    };
  }, [chatApiContext, dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsView />
        <MessagesView />
      </div>
      <ModalWindow />
    </div>
  );
};

export default ChatView;
