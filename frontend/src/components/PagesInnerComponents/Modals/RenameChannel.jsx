import { object, string  } from 'yup';
import { useFormik } from 'formik';

import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal"
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useSelector} from "react-redux";

import { selectChannels } from "../../../slices/channelsSlice.js";
import { ChatApiContext } from '../../../contexts/ChatApiProvider.jsx';
import { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl } from 'react-bootstrap';

const RenameChannelForm = ({handleClose, channel}) => {

    const alreadyUsedChannelNames = useSelector(selectChannels).map((channel) => channel.name);
    const chatContext = useContext(ChatApiContext);

    const input = useRef(null);

    useEffect(() => {
      input.current.focus();
      input.current.select();
    }, []);


    const formik = useFormik({
        initialValues: {
            newChannelName: "",
        },
        validationSchema: object({
            newChannelName: string()
              .max(20, 'Название должно содержать не более 20 символов')
              .min(3, "Название должно содержать не менее 3 символов")
              .notOneOf(alreadyUsedChannelNames, "Название канала уже используется")
              .required('Необходимо ввести название канала'),
          }),
        onSubmit: values => {

          // передать ченл с новым именем
          const channelWithNewName = {...channel, name: values.newChannelName};
            chatContext.renameChannel(channelWithNewName);
            handleClose();
            formik.resetForm();

        },
      });

      const {t} = useTranslation();

      return (
        <Container fluid className="h-100">
        <Row className="justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
                        <Form onSubmit={formik.handleSubmit}>
                            <Stack gap={1} >
                                <h4 className="text-center mt-1 mb-3">{t("newChannelName")}</h4>
                                <Form.Group controlId='name'>
                                    <Form.Label visuallyHidden>{t("newChannelName")}</Form.Label>
                                    <Form.Control
                                        ref={input}
                                        name="newChannelName"
                                        type="text"
                                        placeholder={t("newChannelName")}
                                        onChange={formik.handleChange}
                                        value={formik.values.newChannelName}
                                        className={formik.errors.newChannelName ? "border border-danger" : ""}
                                    />
                                </Form.Group>
                                {formik.touched.newChannelName && formik.errors.newChannelName ? (
                                    <div className="text-danger">{formik.errors.newChannelName}</div>
                                ) : <div></div>}

                                <div className="mx-auto mb-3 mt-3">
                                    <Button variant="success" type="submit" className="btn-lg">{t("confirm")}</Button>
                                </div>
                            </Stack>
                        </Form>
            </div>
        </Row>
    </Container>
      );
}

 const RenameChannelModal = (props) => {

  const {t} = useTranslation();

    return (
        <>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{t("renameChannel")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <RenameChannelForm handleClose={props.handleClose} channel={props.channel}></RenameChannelForm>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={props.handleClose}>{t("close")}</Button>
        </Modal.Footer>
      </>

    );
}

export default RenameChannelModal;
