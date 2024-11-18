import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import LeoProfanity from 'leo-profanity';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

import { selectChannels, selectCurrentChannelId, actions as ChannelsActions } from '../../slices/channelsSlice.js';
import { actions as modalActions } from '../../slices/modalSlice.js';

const LockedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 18 18">
    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
  </svg>
);

const AddIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="25" height="25" fill="currentColor">
    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
  </svg>
);

const Channel = ({ channel }) => {
  const { t } = useTranslation();
  const censorship = LeoProfanity;

  const dispatch = useDispatch();
  const currentChannelId = useSelector(selectCurrentChannelId);

  const changeCurrentActiveChannel = useCallback(() => {
    dispatch(ChannelsActions.setCurrentChannelId(channel.id));
  }, [channel.id, dispatch]);

  const currentVariant = currentChannelId === channel.id ? 'success' : 'outline-success';

  const handleRenameChannel = () => {
    dispatch(modalActions.setCurrentModalType({ type: 'RenameChannelModal', props: { channel } }));
    dispatch(modalActions.toggleIsOpen());
  };

  const handleDeleteChannel = () => {
    dispatch(modalActions.setCurrentModalType({ type: 'DeleteChannelModal', props: { channel } }));
    dispatch(modalActions.toggleIsOpen());
  };

  return (
    <Dropdown as={ButtonGroup} className="w-100 mb-2">
      <Button
        onClick={changeCurrentActiveChannel}
        variant={currentVariant}
        className="w-100"
      >
        <span className="me-1">#</span>
        {censorship.clean(channel.name)}
        {channel.removable && <LockedIcon />}
      </Button>

      {channel.removable && (
        <Dropdown.Toggle split variant={currentVariant} id="dropdown-split-basic">
          <span className="visually-hidden">{t('interface.manageChannel')}</span>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleRenameChannel}>{t('interface.rename')}</Dropdown.Item>
            <Dropdown.Item onClick={handleDeleteChannel}>{t('interface.delete')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Toggle>
      )}

    </Dropdown>
  );
};

const RenderChannelList = () => {
  const channels = useSelector(selectChannels);

  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((channel) => (
        <li className="nav-item w-100" key={channel.id}>
          <Channel channel={channel} />
        </li>
      ))}
    </ul>

  );
};

const CreateNewChannelButton = () => {
  const dispatch = useDispatch();

  const handleAddChannel = () => {
    dispatch(modalActions.setCurrentModalType({ type: 'NewChannelModal', props: {} }));
    dispatch(modalActions.toggleIsOpen());
  };

  return (
    <button type="button" className="p-0 text-success btn btn-group-vertical" onClick={handleAddChannel}>
      <AddIcon />
      <span className="visually-hidden">+</span>
    </button>
  );
};

const ChannelsView = () => {
  const { t } = useTranslation();

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('interface.channels')}</b>
        <CreateNewChannelButton />
      </div>
      <RenderChannelList />
    </div>
  );
};

export default ChannelsView;
