import { object, string } from 'yup';
import { useFormik } from 'formik';

import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useSelector } from 'react-redux';

import { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { selectChannels } from '../../../slices/channelsSlice.js';
import { ChatApiContext } from '../../../contexts/ChatApiProvider.jsx';

const RenameChannelForm = ({ handleClose, channel }) => {
  const alreadyUsedChannelNames = useSelector(selectChannels).map((c) => c.name);
  const chatContext = useContext(ChatApiContext);
  const { t } = useTranslation();

  const input = useRef(null);

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
    onSubmit: (values) => {
      const channelWithNewName = { ...channel, name: values.newChannelName };
      chatContext.renameChannel(channelWithNewName);
      toast(t('toasts.renameChannelAlert'));
      handleClose();
      formik.resetForm();
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Form onSubmit={formik.handleSubmit}>
            <Stack gap={1}>
              <Form.Group controlId="name">
                <Form.Label visuallyHidden>{t('interface.newChannelName')}</Form.Label>
                <Form.Control
                  ref={input}
                  name="newChannelName"
                  type="text"
                  placeholder={t('interface.newChannelName')}
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

const RenameChannelModal = ({ handleClose, additionalProps: { channel } }) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{t('interface.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <RenameChannelForm handleClose={handleClose} channel={channel} />

      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleClose}>{t('interface.close')}</Button>
      </Modal.Footer>
    </>

  );
};

export default RenameChannelModal;
