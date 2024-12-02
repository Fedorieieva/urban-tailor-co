import React from "react";
import {Form, Formik} from "formik";
import * as yup from 'yup';
import InputField from "../../atoms/InputField/InputField.jsx";
import Button from "../../atoms/Button/Button.jsx";
import style from './style.module.scss';
import {useNavigate} from "react-router-dom";
import {useLogInUser} from "../../../hooks/handleUser.js";
import Typography from "@/shared/ui/Typography/Tupography.jsx";

const LoginForm = () => {
    const {fetchAuth} = useLogInUser();
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = yup.object().shape({
        email: yup.string().required('Required'),
        password: yup.string().required('Required'),
    });

    const handleSubmit = async (values, {setSubmitting, setErrors}) => {
        try {
            await fetchAuth(values);
            navigate('/appointments');
        } catch (error) {
            console.error("Login error", error);
            setErrors({email: 'Login failed. Please check your credentials.'});
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
            <Form className={style.form}>
                <div className={style.inputsWrapper}>
                    <InputField name='email' placeholder='E-mail'/>
                    <InputField name='password' placeholder='Password'/>
                </div>

                <Button type='submit' variant='primary' size='large'>
                    <Typography mediumBold uppercase>Sign In</Typography>
                </Button>
            </Form>
        </Formik>
    );
};

export default LoginForm
