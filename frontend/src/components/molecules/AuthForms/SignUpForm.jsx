import React from "react";
import {Form, Formik} from "formik";
import * as yup from 'yup';
import InputField from "../../atoms/InputField/InputField.jsx";
import Button from "../../atoms/Button/Button.jsx";
import style from './style.module.scss';
import {useCreateUser} from "../../../hooks/handleUser.js";
import Typography from "@/shared/ui/Typography/Tupography.jsx";

const SignUpForm = () => {
    const initialValues = {
        username: '',
        email: '',
        password: ''
    };

    const isRequiredStr = ' is required!';

    const validationSchema = yup.object().shape({
        username: yup.string().required('User name' + isRequiredStr),
        email: yup.string().email('Invalid e-mail format').required('E-mail' + isRequiredStr),
        password: yup.string().min(6, 'Password must consist of at least 6 characters').required('Password' + isRequiredStr)
    });

    const handleSubmit = useCreateUser();

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            <Form className={style.form}>
                <div className={style.inputsWrapper}>
                    <InputField name='username' placeholder='Your Name'/>
                    <InputField name='email' placeholder='E-mail'/>
                    <InputField type='password' name='password' placeholder='Password'/>
                </div>

                <Button
                    type='submit'
                    variant='primary'
                    size='large'
                >
                    <Typography mediumBold uppercase>Sign Up</Typography>
                </Button>
            </Form>
        </Formik>
    );
};

export default SignUpForm
