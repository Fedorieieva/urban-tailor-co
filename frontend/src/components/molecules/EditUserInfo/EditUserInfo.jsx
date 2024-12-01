import React, {useState} from "react";
import style from './style.module.scss';
import {useSelector} from "react-redux";
import {selectAuthUserToken, selectUploadedProfileImage, selectUser} from "@/store/selectors/index.js";
import {Field, Form, Formik} from "formik";
import * as yup from 'yup';
import axios from "axios";
import InputField from "../../atoms/InputField/InputField.jsx";
import Button from "../../atoms/Button/Button.jsx";
import {API_URL} from "@/config/config.js";
import EditPassword from "@/components/molecules/EditPassword/EditPassword.jsx";

const EditUserInfo = () => {
    const userInfo = useSelector(selectUser);
    const userToken = useSelector(selectAuthUserToken);
    const userUploadedImg = useSelector(selectUploadedProfileImage);
    const [editPassword, setEditPassword] = useState(false);

    const initialValues = {
        username: userInfo.username || '',
        email: userInfo.email || '',
        userAvatar: userInfo.userAvatar || '',
    }

    const validationSchema = yup.object().shape({
        username: yup.string().required('First name is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),
    });

    const handleSubmit = async (values, {resetForm}) => {
        const newData = {
            ...values,
            userAvatar: userUploadedImg || values.userAvatar
        };

        try {
            const response = await axios.put(
                `${API_URL}/users/${userInfo.id}`,
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
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <Form className={style.form}>
                    <div className={style.inputsWrapper}>
                        <InputField name='username' placeholder='Your Name'/>
                        <InputField name='email' placeholder='E-mail'/>
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

            {!editPassword ? (
                <Button
                    onClick={() => setEditPassword(true)}
                    variant='secondary'
                    size='large'
                    className={style.passwordBtn}
                >
                    Edit Password
                </Button>
            ) : <EditPassword/>}
        </section>
    );
};

export default EditUserInfo;
