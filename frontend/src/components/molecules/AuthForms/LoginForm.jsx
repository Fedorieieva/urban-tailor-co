import React from "react";
import { Form, Formik } from "formik";
import * as yup from 'yup';
import InputField from "../../atoms/InputField/InputField.jsx";
import Button from "../../atoms/Button/Button.jsx";
import style from './style.module.scss';
import { useLogInUser } from "../../../hooks/handleUser.js";
import Typography from "@/shared/ui/Typography/Tupography.jsx";

const LoginForm = () => {
    const { fetchAuth } = useLogInUser();

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = yup.object().shape({
        email: yup.string().required('Required'),
        password: yup.string().required('Required'),
    });

    const handleSubmit = async (values, { setStatus, setSubmitting }) => {
        try {
            setStatus(undefined);
            await fetchAuth(values);
        } catch (error) {
            console.error("Login error", error);
            setStatus({ apiError: 'Login failed. Please check your credentials.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {({ status, isSubmitting }) => (
                <Form className={style.form}>
                    <div className={style.inputsWrapper}>
                        <InputField name='email' placeholder='E-mail'/>
                        <InputField type='password' name='password' placeholder='Password'/>
                    </div>

                    {status && status.apiError && (
                        <div className={style.errorBanner}>
                            <Typography variant="body2">{status.apiError}</Typography>
                        </div>
                    )}

                    <Button
                        type='submit'
                        variant='primary'
                        size='large'
                        disabled={isSubmitting}
                    >
                        <Typography mediumBold uppercase>
                            {isSubmitting ? 'Signing In...' : 'Sign In'}
                        </Typography>
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;