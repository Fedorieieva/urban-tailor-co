import React, {useState} from "react";
import style from './style.module.scss';
import {useSelector} from "react-redux";
import {selectAuthUserToken, selectUploadedProfileImage, selectUser} from "../../../store/selectors/index.js";
import {Field, Form, Formik} from "formik";
import * as yup from 'yup';
import axios from "axios";
import InputField from "../../atoms/InputField/InputField.jsx";
import Button from "../../atoms/Button/Button.jsx";
import {API_URL} from "../../../config/config.js";

const EditUserInfo = () => {
    const userInfo = useSelector(selectUser);
    const userToken = useSelector(selectAuthUserToken);
    const userUploadedImg = useSelector(selectUploadedProfileImage);

    const initialValues = {
        firstName: userInfo.firstName || '',
        lastName: userInfo.lastName || '',
        email: userInfo.email || '',
        birthdate: userInfo.birthdate || '',
        gender: userInfo.gender || '',
        avatarUrl: userInfo.avatarUrl || '',
        // login: userInfo.login || '',
    }

    const validationSchema = yup.object().shape({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),
        birthdate: yup
            .string()
            .nullable()
            .transform((value, originalValue) => {
                return originalValue ? new Date(originalValue).toISOString() : null;
            }),
        gender: yup.string().oneOf(['male', 'female', 'other']).nullable(),
        // avatarUrl: yup.string().url('Invalid URL format').nullable(),
        // login: yup.string().required('Login is required')
    });

    const handleSubmit = async (values, {resetForm}) => {
        const newData = {
            ...values,
            birthdate: values.birthdate || '',
            avatarUrl: userUploadedImg || values.avatarUrl
        };

        try {
            const response = await axios.put(
                `${API_URL}/users`,
                newData,
                {
                    headers: {
                        Authorization: `${userToken}`
                    }
                }
            );

            console.log('Profile updated successfully:', response.data);
            resetForm();
        } catch (error) {
            console.error('An error occurred while editing profile:', error.response?.data || error.message);
        }
    }


    return (
        <section className={style.edit}>
            {/*<Button onClick={() => setIsModalOpen(true)}>upload new profile photo</Button>*/}

            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <Form className={style.form}>
                    <div className={style.inputsWrapper}>
                        <InputField name='firstName' placeholder='First Name'/>
                        <InputField name='lastName' placeholder='Last Name'/>
                        <InputField name='email' placeholder='E-mail'/>
                        {/*<InputField name='login' placeholder='Login'/>*/}
                        <InputField name='birthdate' placeholder='Birth Date'/>

                        <div className={style.selectGender}>
                            <Field as='select' name='gender'>
                                <option value="">Select Gender</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="other">Other</option>
                            </Field>
                        </div>
                    </div>

                    <Button
                        type='submit'
                        variant='primary'
                        size='large'
                    >
                        Edit Profile
                    </Button>
                </Form>
            </Formik>


            <Button
                to='password'
                variant='transparent'
                size='large'
                className={style.passwordBtn}
            >
                Edit Password
            </Button>
            {/*{isModalOpen && (<ImageUploadModal onClose={() => setIsModalOpen(false)}/>)}*/}
        </section>
    );
};

export default EditUserInfo;
