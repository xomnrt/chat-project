import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal"
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';


const DeleteChannelForm = () => {

    const deleteChannel = () => console.log("channel deleted");

      return (
        <Container fluid className="h-100">
        <Row className="justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
                            <Stack gap={1} >
                                <h4 className="text-center mt-1 mb-3">Вы уверены?</h4>
                                <div className="mx-auto mb-3 mt-3">
                                    <Button variant="success" type="submit" className="btn-lg mx-2" onClick={deleteChannel}>Подтвердить</Button>
                                    <Button variant="danger" type="submit" className="btn-lg mx-2" onClick={deleteChannel}>Отмена</Button>
                                </div>
                            </Stack>
            </div>
        </Row>
    </Container>
      );
}

 const DeleteChannelModal = (props) => {

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <DeleteChannelForm></DeleteChannelForm>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={props.onHide}>Закрыть</Button>
        </Modal.Footer>
      </Modal>

    );
}

export default DeleteChannelModal;
