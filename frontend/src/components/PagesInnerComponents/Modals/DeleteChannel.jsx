import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ChatApiContext } from '../../../contexts/ChatApiProvider';
import { actions, selectCurrentChannelId } from '../../../slices/channelsSlice';

const DeleteChannelForm = ({ handleClose, channel }) => {
  const dispatch = useDispatch();

  const currentChannelId = useSelector(selectCurrentChannelId);

  const chatContext = useContext(ChatApiContext);

  const deleteChannel = () => {
    chatContext.deleteChannel(channel);
    if (currentChannelId === channel.id) {
      dispatch(actions.setCurrentChannelId(1));
    }
    handleClose();
  };

  const { t } = useTranslation();

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Stack gap={1}>
            <h4 className="text-center mt-1 mb-3">{t('sure')}</h4>
            <div className="mx-auto mb-3 mt-3">
              <Button variant="danger" type="submit" className="btn-lg mx-2" onClick={deleteChannel}>{t('confirm')}</Button>
              <Button variant="success" type="submit" className="btn-lg mx-2" onClick={handleClose}>{t('cancel')}</Button>
            </div>
          </Stack>
        </div>
      </Row>
    </Container>
  );
};

const DeleteChannelModal = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{t('deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <DeleteChannelForm handleClose={props.handleClose} channel={props.channel} />

      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={props.handleClose}>{t('close')}</Button>
      </Modal.Footer>
    </>

  );
};

export default DeleteChannelModal;
