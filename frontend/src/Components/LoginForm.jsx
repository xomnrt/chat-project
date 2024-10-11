import { Formik, Form, Field, useFormik } from 'formik';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
        <Container>
            <Card>
                <Card.Header>Войти</Card.Header>
                <Card.Body>
                    <form onSubmit={formik.handleSubmit}>
                        <Row>
                            <label htmlFor="username">Ваш ник</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Ваш ник"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                            />
                            {formik.touched.username && formik.errors.username ? (
                                <div>{formik.errors.username}</div>
                            ) : null}
                        </Row>

                        <Row>
                            <label htmlFor="password">Пароль</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Пароль"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />

                            {formik.touched.password && formik.errors.password ? (
                                <div>{formik.errors.password}</div>
                            ) : null}
                        </Row>

                        <Row>
                            <Button variant="primary" type="submit">Войти</Button>
                        </Row>

                    </form>
                </Card.Body>
                <Card.Footer className="text-muted text-center">
                    <Card.Link href="/signup">Зарегистрироваться</Card.Link>
                </Card.Footer>
            </Card>
        </Container>
    );
}

export default LoginForm;
