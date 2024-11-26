import React from "react";
import {Form, Formik} from "formik";
import * as yup from 'yup';
import InputField from "../../atoms/InputField/InputField.jsx";
import Button from "../../atoms/Button/Button.jsx";
import style from './style.module.scss';
import {useDispatch} from "react-redux";
import {fetchAuth} from "../../../store/reducers/index.js";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialValues = {
        loginOrEmail: '',
        password: ''
    };

    const validationSchema = yup.object().shape({
        loginOrEmail: yup.string().required('Required'),
        password: yup.string().required('Required'),
    });

    const handleSubmit = async (values, {setSubmitting, setErrors}) => {
        try {
            await dispatch(fetchAuth(values));
            navigate('/home');
        } catch (error) {
            console.error("Login error", error);
            setErrors({loginOrEmail: 'Login failed. Please check your credentials.'});
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
                    <InputField name='loginOrEmail' placeholder='E-mail'/>
                    <InputField name='password' placeholder='Password'/>
                </div>

                <Button
                    type='submit'
                    variant='primary'
                    isFullWidth={true}
                >
                    Log In
                </Button>
            </Form>
        </Formik>
    )
}

export default LoginForm