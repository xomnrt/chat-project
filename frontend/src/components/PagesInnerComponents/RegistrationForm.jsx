import { useFormik } from 'formik';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { AuthContext } from '../../contexts/AuthProvider.jsx';

const validate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = i18next.t('errors.noUsername');
  } else if (!(values.username.length > 3 && values.username.length < 20)) {
    errors.username = i18next.t('errors.usernameRequirements');
  }

  if (!values.password) {
    errors.password = i18next.t('errors.noPassword');
  } else if (values.password.length < 6) {
    errors.password = i18next.t('errors.passwordRequirements');
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = i18next.t('errors.noPasswordConfirmation');
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = i18next.t('errors.noPasswordMatching');
  }

  return errors;
};

const RegistrationForm = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validate,
    onSubmit: async (values) => {
      formik.resetForm();
      try {
        await authContext.sendSignupData(values.username, values.password);
        formik.resetForm();
        navigate('/');
      } catch (e) {
        console.log(e);
        if (e instanceof AxiosError && e.status === 409) {
          console.log('axios error');
          formik.setErrors({
            username: i18next.t('errors.usernameAlreadyInUse'),
          });
        } else {
          console.log(e);
        }
      }
    },
  });

  const { t } = useTranslation();

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="mx-auto row p-5">
              <Form onSubmit={formik.handleSubmit}>
                <Stack gap={3}>
                  <h1 className="text-center mb-4">{t('interface.signUp')}</h1>
                  <Form.Group className="mb-1" controlId="formUsername">
                    <Form.Label>{t('interface.username')}</Form.Label>
                    <Form.Control
                      name="username"
                      type="text"
                      placeholder={t('interface.username')}
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      className={formik.errors.username ? 'border border-danger' : ''}
                    />
                    {formik.errors.username
                      ? <div className="text-danger">{formik.errors.username}</div> : <div />}
                  </Form.Group>

                  <Form.Group className="mb-1" controlId="formPassword">
                    <Form.Label>{t('interface.password')}</Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder={t('interface.password')}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />

                    {formik.errors.password ? (
                      <div className="text-danger">{formik.errors.password}</div>
                    ) : <div />}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>{t('interface.passwordConfirmation')}</Form.Label>
                    <Form.Control
                      name="confirmPassword"
                      type="password"
                      placeholder={t('interface.passwordConfirmation')}
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                    />

                    {formik.errors.confirmPassword ? (
                      <div className="text-danger">{formik.errors.confirmPassword}</div>
                    ) : <div />}
                  </Form.Group>

                  <div className="mx-auto mb-3 mt-1">
                    <Button variant="success" type="submit" className="btn-lg">{t('interface.signUp')}</Button>
                  </div>
                </Stack>

              </Form>
            </Card.Body>

          </Card>
        </div>
      </Row>
    </Container>
  );
};

export default RegistrationForm;
