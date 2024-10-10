import { Formik, Form, Field, useFormik } from 'formik';

const validate = values => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
        errors.username = 'Неккоректный адрес электронной почты';
    }

    if (!values.password) {
        errors.password = 'Required';
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
        <form onSubmit={formik.handleSubmit}>
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

            <button type="submit">Войти</button>
        </form>
    );
}

export default LoginForm;
