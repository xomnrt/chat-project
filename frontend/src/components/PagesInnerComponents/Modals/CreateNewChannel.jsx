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


const NewChannelNameForm = () => {

    const alreadyUsedChannelNames = useSelector(selectChannels).map((channel) => channel.name);

    const formik = useFormik({
        initialValues: {
            newChannelName: "",
        },
        validationSchema: object({
            newChannelName: string()
              .max(20, 'Название должно содержать не более 20 символов')
              .min(3, "Название должно содержать не менее 3 символов")
              .notOneOf(alreadyUsedChannelNames)
              .required('Необходимо ввести название канала'),
          }),
        onSubmit: values => {

          alert(JSON.stringify(values, null, 2));
        },
      });
      return (
        <Container fluid className="h-100">
        <Row className="justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
                        <Form onSubmit={formik.handleSubmit}>
                            <Stack gap={1} >
                                <h4 className="text-center mt-1 mb-3">Новое название канала</h4>
                                    <Form.Label></Form.Label>
                                    <Form.Control
                                        name="newChannelName"
                                        type="text"
                                        placeholder="Введите название канала"
                                        onChange={formik.handleChange}
                                        value={formik.values.newChannelName}
                                        className={formik.errors.newChannelName ? "border border-danger" : ""}
                                    />
                                    {formik.touched.newChannelName && formik.errors.newChannelName ? (
                                        <div className="text-danger">{formik.errors.newChannelName}</div>
                                    ) : <div></div>}

                                <div className="mx-auto mb-3 mt-3">
                                    <Button variant="success" type="submit" className="btn-lg">Подтвердить</Button>
                                </div>
                            </Stack>
                        </Form>
            </div>
        </Row>
    </Container>
      );
}

 const NewChannelModal = (props) => {

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Создать новый канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <NewChannelNameForm></NewChannelNameForm>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={props.onHide}>Закрыть</Button>
        </Modal.Footer>
      </Modal>

    );
}

export default NewChannelModal;
