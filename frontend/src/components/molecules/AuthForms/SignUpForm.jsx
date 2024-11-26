import React from "react";
import {Form, Formik} from "formik";
import * as yup from 'yup';
import axios from "axios";
import InputField from "../../atoms/InputField/InputField.jsx";
import Button from "../../atoms/Button/Button.jsx";
import style from './style.module.scss';
import {API_URL} from "../../../config/config.js";
import {useNavigate} from "react-router-dom";

const SignUpForm = () => {
    const navigate = useNavigate();
    const initialValues = {
        firstName: '',
        email: '',
        password: ''
    };

    const isRequiredStr = ' is required!';

    const validationSchema = yup.object().shape({
        firstName: yup.string().required('First name' + isRequiredStr),
        email: yup.string().email('Invalid e-mail format').required('E-mail' + isRequiredStr),
        password: yup.string().min(6, 'Password must consist of at least 6 characters').required('Password' + isRequiredStr)
    });

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post(API_URL + '/users', {
                ...values,
                isAdmin: false,
                enabled: false
            });

            navigate('/home');
        } catch (error) {
            console.error('Registration error:', error.response.data);
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
                    <InputField name='firstName' placeholder='Full Name'/>
                    <InputField name='email' placeholder='E-mail'/>
                    <InputField name='password' placeholder='Password'/>
                </div>

                <Button
                    type='submit'
                    variant='primary'
                    isFullWidth={true}
                >
                    Sign Up
                </Button>
            </Form>
        </Formik>
    );
};

export default SignUpForm
