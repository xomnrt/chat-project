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
        errors.username = 'Необходимо ввести имя пользователя';
    } else
        if (6 < values.username.length < 20) {
            errors.username = 'Имя пользователя должно быть от 3 до 20 символов';
        }


    if (!values.password) {
        errors.password = 'Необходимо ввести пароль';
    } else if (values.password.length < 6) {
        errors.password = 'Пароль должен содержать от 6 символов';
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Повторите пароль';
    }
    else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Пароли не совпадают';
    }

    return errors;
};



const RegistrationForm = () => {
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: "",
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
                                    <h1 className="text-center mb-4">Зарегистрироваться</h1>
                                    <Form.Group className="mb-1" controlId="formUsername">
                                        <Form.Label htmlFor="username"></Form.Label>
                                        <Form.Control
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="Имя пользователя"
                                            onChange={formik.handleChange}
                                            value={formik.values.username}
                                            className={formik.errors.username ? "border border-danger" : ""}
                                        />
                                        {formik.touched.username && formik.errors.username ? (
                                            <div className="text-danger">{formik.errors.username}</div>
                                        ) : <div></div>}
                                    </Form.Group>

                                    <Form.Group className="mb-1" controlId="formPassword">
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

                                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                                        <Form.Label htmlFor="confirmPassword"></Form.Label>
                                        <Form.Control
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="Повторите пароль"
                                            onChange={formik.handleChange}
                                            value={formik.values.confirmPassword}
                                        />

                                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                            <div className="text-danger">{formik.errors.confirmPassword}</div>
                                        ) : <div></div>}
                                    </Form.Group>

                                    <div className="mx-auto mb-3 mt-1">
                                        <Button variant="primary" type="submit" className="btn-lg">Зарегистрироваться</Button>
                                    </div>
                                </Stack>

                            </Form>
                        </Card.Body>

                    </Card>
                </div>
            </Row>
        </Container>
    );
}

export default RegistrationForm;
