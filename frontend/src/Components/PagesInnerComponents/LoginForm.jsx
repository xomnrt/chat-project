import { useFormik } from 'formik';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form';
import axios, { AxiosError } from "axios";
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../Slices/authSlice.js';
import { useNavigate } from 'react-router-dom';

const validate = values => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Необходимо ввести имя пользователя';
    }

    if (!values.password) {
        errors.password = 'Необходимо ввести пароль';
    } else if (values.password.length <= 3) {
        errors.password = 'Пароль должен содержать больше 3 символов';
    }

    return errors;
};



const LoginForm = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validate,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('/api/v1/login', { username: values.username, password: values.password });
                console.log(response.data); // => { token: ..., username: 'admin' }
                const userInfo = response.data;
                formik.resetForm();
                dispatch(setUserInfo(userInfo))
                navigate("/");

                // try {
                //     const channelsAndMessagesResponse = await axios.get('/api/v1/data', {
                //         headers: {
                //           Authorization: `Bearer ${store.getState().auth.token}`,
                //         },
                //       })

                //     const channelsAndMessagesData = channelsAndMessagesResponse.data; // {channels: [{id, name, removable}, {}], messages: [], currentChannelId: number}
                //     console.log(channelsAndMessagesData);
                //     const channelsData = channelsAndMessagesData.channels;
                //     channelsData.map((channel) => dispatch(setChannelInfo(channel)))

                //     console.log(store.getState())
                // }
                // catch (e) {
                //     console.log(e)
                // }

            } catch (e) {
                if (e instanceof AxiosError && e.status === 401) {
                    formik.setErrors({
                        password: "Неправильное имя пользователя или пароль"
                    });
                } else {
                    console.log(e)
                }

            }

            console.log(JSON.stringify(values, null, 2));


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
                                            placeholder="Имя пользователя"
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
