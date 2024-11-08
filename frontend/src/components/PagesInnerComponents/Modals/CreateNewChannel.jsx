import { object, string } from 'yup';
import { useFormik } from 'formik';

import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useDispatch, useSelector } from 'react-redux';

import { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { selectChannels, actions as channelActions } from '../../../slices/channelsSlice.js';
import { ChatApiContext } from '../../../contexts/ChatApiProvider.jsx';

import { actions as modalActions } from '../../../slices/modalSlice.js';

const NewChannelNameForm = () => {
  const alreadyUsedChannelNames = useSelector(selectChannels).map((channel) => channel.name);
  const chatContext = useContext(ChatApiContext);
  const dispatch = useDispatch();

  const input = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    input.current.focus();
    input.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      newChannelName: '',
    },
    validationSchema: object({
      newChannelName: string()
        .max(20, t('errors.channelNameRequirements'))
        .min(3, t('errors.channelNameRequirements'))
        .notOneOf(alreadyUsedChannelNames, t('errors.channelNameAlreadyInUse'))
        .required(t('errors.noChannelName')),
    }),
    onSubmit: async (values) => {
      const newChannel = await chatContext.addNewChannel({ name: values.newChannelName });

      formik.resetForm();

      dispatch(modalActions.toggleIsOpen());
      dispatch(channelActions.addChannel(newChannel));
      dispatch(channelActions.setCurrentChannelId(newChannel.id));

      toast(t('toasts.createChannelAlert'));
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Form onSubmit={formik.handleSubmit}>
            <Stack gap={1}>
              <h4 className="text-center mt-1 mb-3">{t('interface.createNewChannelName')}</h4>
              <Form.Group controlId="name">
                <Form.Label visuallyHidden>{t('interface.createNewChannelNamePlaceholder')}</Form.Label>
                <Form.Control
                  ref={input}
                  name="newChannelName"
                  type="text"
                  placeholder={t('interface.createNewChannelNamePlaceholder')}
                  onChange={formik.handleChange}
                  value={formik.values.newChannelName}
                  className={formik.errors.newChannelName ? 'border border-danger' : ''}
                />
              </Form.Group>

              {formik.touched.newChannelName && formik.errors.newChannelName ? (
                <div className="text-danger">{formik.errors.newChannelName}</div>
              ) : <div />}

              <div className="mx-auto mb-3 mt-3">
                <Button variant="success" type="submit" className="btn-lg">{t('interface.confirm')}</Button>
              </div>
            </Stack>
          </Form>
        </div>
      </Row>
    </Container>
  );
};

const NewChannelModal = ({ handleClose }) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{t('interface.createNewChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <NewChannelNameForm />

      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleClose}>{t('interface.close')}</Button>
      </Modal.Footer>
    </>

  );
};

export default NewChannelModal;
