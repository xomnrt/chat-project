import { useContext, useRef } from 'react';
import { useSelector } from 'react-redux';

import { object, string } from 'yup';
import { useTranslation } from 'react-i18next';
import LeoProfanity from 'leo-profanity';
import Avatar from 'boring-avatars';
import { useFormik } from 'formik';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { selectCurrentChannelId, selectCurrentChannel } from '../../slices/channelsSlice.js';
import { selectMessages } from '../../slices/messagesSlice.js';

import { AuthContext } from '../../contexts/AuthProvider.jsx';
import { ChatApiContext } from '../../contexts/ChatApiProvider.jsx';

const UserIcon = ({ username }) => (
  <Avatar
    name={username}
    colors={['#aadead', '#bbdead', '#ccdead', '#dddead', '#eedead']}
    variant="beam"
    size={60}
  />
);

const toDayTime = (timeSending) => {
  const newDate = new Date(timeSending);
  const time = newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (newDate.toDateString() === new Date().toDateString()) {
    return `сегодня, ${time}`;
  }

  const day = newDate.toLocaleDateString('ru-RU', { weekday: 'long' });
  return `${day}, ${time}`;
};

const Message = ({ message }) => {
  const censorship = LeoProfanity;

  return (
    <li className="mb-3">
      <div className="d-flex justify-content-between ">
        <p className="small mb-1"><b>{message.username}</b></p>
        <p className="small mb-1 text-muted">
          {toDayTime(message.timeSending)}
        </p>
      </div>
      <div className="d-flex flex-row justify-content-start">
        <UserIcon username={message.username} />
        <div>
          <p className="small p-2 ms-3 mb-3 rounded-4 px-3" style={{ backgroundColor: '#f5f6f7' }}>
            {censorship.clean(message.body)}
          </p>
        </div>
      </div>
    </li>
  );
};

const RenderMessageList = () => {
  const messageList = useRef(null);

  const allMessages = useSelector(selectMessages);
  const currentChannelId = useSelector(selectCurrentChannelId);

  const messages = allMessages.filter((message) => message.channelId === currentChannelId);

  return (
    <ul ref={messageList} id="messages-box" className="chat-messages overflow-auto px-5 list-unstyled">
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </ul>
  );
};

const SendMessageForm = () => {
  const { t } = useTranslation();

  const authContext = useContext(AuthContext);
  const chatContext = useContext(ChatApiContext);
  const currentChannelId = useSelector(selectCurrentChannelId);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: object({
      body: string()
        .required(),
    }),
    onSubmit: (values) => {
      chatContext.addNewMessage({
        body: values.body,
        username: authContext.userData.username,
        channelId: currentChannelId,
        timeSending: Date.now(),
      });
      formik.resetForm();
    },
  });
  return (
    <div className="mt-auto px-5 py-3">

      <Form onSubmit={formik.handleSubmit}>
        <InputGroup className="mb-3" size="lg">
          <Form.Control
            name="body"
            type="text"
            aria-label={t('interface.newMessage')}
            placeholder={t('interface.newMessagePlaceholder')}
            onChange={formik.handleChange}
            value={formik.values.body}
            className="py-1 border rounded-2"
            aria-describedby="basic-addon2"
          />

          <Button variant="outline-success" id="button-addon2" type="submit">
            <b>{t('interface.send')}</b>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

const MessagesView = () => {
  const censorship = LeoProfanity;

  const { t } = useTranslation();
  const currentChannel = useSelector(selectCurrentChannel);
  const messages = useSelector(selectMessages);
  const messagesForCurrentChannel = messages.filter(
    (message) => message.channelId === currentChannel.id,
  );

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{censorship.clean(currentChannel?.name)}</b>
          </p>
          <span className="text-muted">
            {t('interface.messagesCount')}
            {messagesForCurrentChannel.length}
          </span>
        </div>
        <RenderMessageList />
        <SendMessageForm />
      </div>
    </div>
  );
};

export default MessagesView;
