import { useContext } from 'react';
import { useFormik } from 'formik';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form';
import { AxiosError } from "axios";
import { useNavigate } from 'react-router-dom';

import {AuthContext} from '../../contexts/AuthProvider';
import { useTranslation } from 'react-i18next';

const validate = values => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Необходимо ввести имя пользователя';
    }

    if (!values.password) {
        errors.password = 'Необходимо ввести пароль';
    } else if (values.password.length <= 3) {
        errors.password = 'Пароль должен содержать от 3 до 20 символов';
    }

    return errors;
};

const LoginForm = () => {

    const authContext = useContext(AuthContext);

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validate,
        onSubmit: async (values) => {
            try {
                await authContext.sendLoginData(values.username, values.password);
                formik.resetForm();
                navigate("/");
            } catch (e) {
                if (e instanceof AxiosError && e.status === 401) {
                    formik.setErrors({
                        password: "Неверные имя пользователя или пароль"
                    });
                } else {
                    console.log(e)
                }
            }
        },
    });

    const {t} = useTranslation();

    return (
        <Container fluid className="h-100">
            <Row className="justify-content-center align-content-center h-100">
                <div className="col-12 col-md-8 col-xxl-6">
                    <Card className="shadow-sm">
                        <Card.Body className="mx-auto row p-5">
                            <Form onSubmit={formik.handleSubmit}>
                                <Stack gap={3} >
                                    <h1 className="text-center mb-4">{t("login")}</h1>
                                    <Form.Group className="mb-1" controlId="formUsername">
                                        <Form.Label>Ваш ник</Form.Label>
                                        <Form.Control
                                            name="username"
                                            type="text"
                                            placeholder="Ваш ник"
                                            onChange={formik.handleChange}
                                            value={formik.values.username}
                                            className={formik.errors.username ? "border border-danger" : ""}
                                        />
                                        {formik.errors.username ? (
                                            <div className="text-danger">{formik.errors.username}</div>
                                        ) : <div></div>}
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formPassword">
                                        <Form.Label>Пароль</Form.Label>
                                        <Form.Control
                                            name="password"
                                            type="password"
                                            placeholder="Пароль"
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                        />

                                        {formik.errors.password ? (
                                            <div className="text-danger">{formik.errors.password}</div>
                                        ) : <div></div>}
                                    </Form.Group>

                                    <div className="mx-auto mb-3 mt-1">
                                        <Button variant="success" type="submit" className="btn-lg">{t("login")}</Button>
                                    </div>
                                </Stack>

                            </Form>
                        </Card.Body>
                        <Card.Footer className="text-muted text-center p-4">
                            {t("noRegistrationData")}<Card.Link href="/signup" className="link-underline link-underline-opacity-0 link-success" >{t("signUp")}</Card.Link>
                        </Card.Footer>
                    </Card>
                </div>
            </Row>
        </Container>
    );
}

export default LoginForm;
