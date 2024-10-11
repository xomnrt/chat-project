import { useFormik } from 'formik';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form';


const validate = values => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Необходимо ввести ник';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
        errors.username = 'Неккоректный адрес электронной почты';
    }

    if (!values.password) {
        errors.password = 'Необходимо ввести пароль';
    } else if (values.password.length <= 3) {
        errors.password = 'Пароль должен содержать больше 3 символов';
    }

    return errors;
};



const LoginForm = () => {
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validate,
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));
            formik.resetForm();
        },
    });
    return (
        <Container fluid className="h-100">
            <Row className="justify-content-center align-content-center h-100">
                <div className="col-12 col-md-8 col-xxl-6">
                    <Card className="shadow-sm">
                        <Card.Body class="mx-auto row p-5">
                            <Form onSubmit={formik.handleSubmit}>
                                <Stack gap={3} >
                                    <h1 className="text-center mb-4">Войти</h1>
                                    <Form.Group className="mb-1" controlId="formUsername">
                                        <Form.Label htmlFor="username"></Form.Label>
                                        <Form.Control
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="Ваш ник"
                                            onChange={formik.handleChange}
                                            value={formik.values.username}
                                            className={formik.errors.username ? "border border-danger" : ""}
                                        />
                                        {formik.touched.username && formik.errors.username ? (
                                            <div className="text-danger">{formik.errors.username}</div>
                                        ) : <div></div>}
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formPassword">
                                        <Form.Label htmlFor="password"></Form.Label>
                                        <Form.Control
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Пароль"
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                        />

                                        {formik.touched.password && formik.errors.password ? (
                                            <div className="text-danger">{formik.errors.password}</div>
                                        ) : <div></div>}
                                    </Form.Group>

                                    <div className="mx-auto mb-3 mt-1">
                                        <Button variant="primary" type="submit" className="btn-lg">Войти</Button>
                                    </div>
                                </Stack>

                            </Form>
                        </Card.Body>
                        <Card.Footer className="text-muted text-center p-4">
                            Нет аккаунта? <Card.Link href="/signup">Зарегистрироваться</Card.Link>
                        </Card.Footer>
                    </Card>
                </div>
            </Row>
        </Container>
    );
}

export default LoginForm;
