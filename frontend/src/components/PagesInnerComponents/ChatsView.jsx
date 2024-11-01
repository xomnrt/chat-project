import { useFormik } from 'formik';
import { useCallback, useContext, useEffect, useRef } from "react";
import { object, string  } from 'yup';

import { useDispatch, useSelector} from "react-redux";
import { selectChannels, selectCurrentChannelId, selectCurrentChannel } from "../../slices/channelsSlice.js";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

import Avatar from "boring-avatars";
import ModalWindow from "./Modals/Modal.jsx"

import { AuthContext } from "../../contexts/AuthProvider.jsx";
import { ChatApiContext } from "../../contexts/ChatApiProvider.jsx";

import { actions as ChannelsActions } from '../../slices/channelsSlice.js'
import { actions as MessageActions, selectMessages } from '../../slices/messagesSlice.js'
import {actions as modalActions } from '../../slices/modalSlice';


const UserIcon = ({username}) => {

    return (
        <Avatar
            name={username}
            colors={["#aadead", "#bbdead", "#ccdead", "#dddead", "#eedead"]}
            variant="beam"
            size={60}
        />
    )

}

const LockedIcon = () => {
    return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 18 18">
        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
    </svg>
    )
}

const AddIcon = () => {
    return (
        <>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="25" height="25" fill="currentColor">
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
        </svg>
        <span className="visually-hidden">+</span>
        </>
    )
}

const Channel = ({channel}) => {
    const dispatch = useDispatch();
    const currentChannelId = useSelector(selectCurrentChannelId);

    const changeCurrentActiveChannel = useCallback(() => {
        dispatch(ChannelsActions.setCurrentChannelId(channel.id));
    }, [channel.id, dispatch])

    const currentVariant = currentChannelId === channel.id ? "success" : "outline-success";

    const handleRenameChannel = () => {
        dispatch(modalActions.setCurrentModalType({type: "RenameChannelModal", props: {channel}}));
        dispatch(modalActions.toggleIsOpen());
    }

    const handleDeleteChannel = () => {
        dispatch(modalActions.setCurrentModalType({type: "DeleteChannelModal", props: {channel}}));
        dispatch(modalActions.toggleIsOpen());
    }

    return (
        <Dropdown as={ButtonGroup} className="w-100 mb-2">
            <Button
            onClick={changeCurrentActiveChannel}
            variant={currentVariant}
            className="w-100"
            >
                # {channel.name}
                {channel.removable ? "" : <LockedIcon></LockedIcon>}
            </Button>

            {channel.removable ?
            <Dropdown.Toggle split variant={currentVariant} id="dropdown-split-basic">
            <Dropdown.Menu>
               <Dropdown.Item onClick={handleRenameChannel}>Переименовать</Dropdown.Item>
               <Dropdown.Item onClick={handleDeleteChannel}>Удалить</Dropdown.Item>
             </Dropdown.Menu>
            </Dropdown.Toggle> : ""}

        </Dropdown>
    )
}

const RenderChannelList = () => {

    const channels = useSelector(selectChannels);

    return (
        <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
            {channels.map((channel) => {
                return (<li className="nav-item w-100" key={channel.id}>
                    <Channel channel={channel} />
                </li>)
                })
            }
        </ul>
    )
}


const CreateNewChannelButton = () => {
    const dispatch = useDispatch();

    const handleAddChannel = () => {
        dispatch(modalActions.setCurrentModalType({type: "NewChannelModal", props: {}}));
        dispatch(modalActions.toggleIsOpen());
    }

    return (
        <button type="button" className="p-0 text-success btn btn-group-vertical" onClick={handleAddChannel}>
        <AddIcon></AddIcon>
        </button>
    )

}

const ChannelsView = () => {
    return (
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <CreateNewChannelButton></CreateNewChannelButton>
        </div>
        <RenderChannelList/>
    </div>
    )
}

const toDayTime = (timeSending) => {
    const newDate = new Date(timeSending);
    const time = newDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    if (newDate.toDateString() === new Date().toDateString()) {
        return "сегодня, " + time;
    }

    const day = newDate.toLocaleDateString("ru-RU", { weekday: 'long'});
    return day + ", " + time;
}

const Message = ({message}) => {

    return (
        <li className="mb-3">
            <div className="d-flex justify-content-between ">
                <p className="small mb-1"><b>{message.username}</b></p>
                <p className="small mb-1 text-muted">
                {toDayTime(message.timeSending)}</p>
            </div>
            <div className="d-flex flex-row justify-content-start">
                <UserIcon username={message.username}/>
                  <div>
                    <p className="small p-2 ms-3 mb-3 rounded-4 px-3" style={{ backgroundColor: "#f5f6f7" }}>
                    {message.body}
                    </p>
                  </div>
                </div>
             </li>
    )
}

const RenderMessageList = () => {

    const messageList = useRef(null);

    const allMessages = useSelector(selectMessages);
    const currentChannelId = useSelector(selectCurrentChannelId);

    const messages = allMessages.filter((message) => message.channelId === currentChannelId)

    return (
        <ul ref={messageList} id="messages-box" className="chat-messages overflow-auto px-5 list-unstyled">
            {messages.map((message) => {
                return (
                       <Message message={message} key={message.id}></Message>
                )
            })}
        </ul>
    );
}

const SendMessageForm = () => {

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
        onSubmit: values => {
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
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение..."
                    onChange={formik.handleChange}
                    value={formik.values.body}
                    className="py-1 border rounded-2"
                    aria-describedby="basic-addon2"
                />

                <Button variant="outline-success" id="button-addon2" type="submit" >
                    <b>Отправить</b>
                </Button>
            </InputGroup>
        </Form>
        </div>
      );


}


const MessagesView = () => {
    const currentChannel = useSelector(selectCurrentChannel);
    const messages = useSelector(selectMessages);
    const messagesForCurrentChannel = messages.filter((message) => message.channelId === currentChannel.id)


    return (
        <div className="col p-0 h-100">
                    <div className="d-flex flex-column h-100">
                        <div className="bg-light mb-4 p-3 shadow-sm small">
                            <p className="m-0">
                                <b>{currentChannel?.name}</b>
                            </p>
                            <span className="text-muted">количество сообщений: {messagesForCurrentChannel.length}</span>
                        </div>
                        <RenderMessageList></RenderMessageList>
                        <SendMessageForm></SendMessageForm>
                    </div>
                </div>
    )
}

const ChatsView = () => {

    const dispatch = useDispatch();
    const chatApiContext = useContext(ChatApiContext);

    useEffect(() => {
        (async () => {
            chatApiContext.connectSocket();

            const {channels, messages, currentChannelId} = await chatApiContext.getCoreChannelsData();
            dispatch(ChannelsActions.setChannelsInfo(channels));
            dispatch(ChannelsActions.setCurrentChannelId(currentChannelId));
            dispatch(MessageActions.setMessagesInfo(messages))

        })()

        return () => {
            chatApiContext.disconnectSocket()
        }
    }, [chatApiContext, dispatch])


    return (
        <>
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
            <ChannelsView />
            <MessagesView/>
            </div>
            <ModalWindow></ModalWindow>
        </div>
        </>
    );
}

export default ChatsView;
