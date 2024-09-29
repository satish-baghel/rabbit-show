import { Field, Form, Formik } from 'formik'
import { Card, CardBody, Col, Container, Label, Row } from 'reactstrap'
import * as Yup from 'yup'
import * as validation from 'src/helpers/validation'
import { Link } from 'react-router-dom'
import { Button, TextField } from 'src/Atoms';


const Login = () => {
    const onSubmit = (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)
        setTimeout(() => {
            resetForm()
            setSubmitting(false)
        }, 1000)
    }
    const initialValues = {
        email: '',
        password: ''
    }
    const validationSchema = Yup.object({
        email: Yup.string()
            .trim()
            .required(`Email ${validation.REQUIRED}`)
            .email(`Email ${validation.INVALID}`)
            .matches(
                // eslint-disable-next-line prefer-regex-literals
                new RegExp(
                    // eslint-disable-next-line no-useless-escape
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                ),
                `Email ${validation.INVALID}`
            ),
        password: Yup.string().required(`Password ${validation.REQUIRED}`)
    })

    return (
        <Container>
            <Row className='align-items-center justify-content-center' style={{ height: '100vh' }}>
                <Col md={8} lg={6} xl={5}>
                    <Card>
                        <CardBody className='p-4'>
                            <div className='text-center mt-2'>
                                <h5 className='text-primary'>Welcome Back !</h5>
                            </div>
                            <div className='p-2 mt-4'>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
                                >
                                    {({ isSubmitting }) => (
                                        <Form className='needs-validation' novalidate>
                                            <div className='mb-3'>
                                                <Label className='form-label' htmlFor='email'>
                                                    Email
                                                </Label>
                                                <Field
                                                    name='email'
                                                    placeholder='Enter email'
                                                    type='email'
                                                    id='email'
                                                    component={TextField}
                                                />
                                            </div>

                                            <div className='mb-3'>
                                                <Label className='form-label' htmlFor='password'>
                                                    Password
                                                </Label>
                                                <Field
                                                    name='password'
                                                    placeholder='Enter password'
                                                    type='password'
                                                    id='password'
                                                    component={TextField}
                                                />

                                                <div className='float-end my-2'>
                                                    <Link
                                                        to='/forgot-password'
                                                        className='text-muted'
                                                    >
                                                        Forgot password?
                                                    </Link>
                                                </div>
                                            </div>

                                            <Button
                                                isLoading
                                                isSubmitting={isSubmitting}
                                                className='btn btn-primary w-100 waves-effect waves-light'
                                                color='primary'
                                                title='Submit'
                                                type='submit'
                                            />
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default Login

//
