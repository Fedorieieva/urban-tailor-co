import React from "react";
import {Form, Formik} from "formik";
import style from "./style.module.scss";
import InputField from "../../atoms/InputField/InputField.jsx";
import Button from "../../atoms/Button/Button.jsx";
import {useSelector} from "react-redux";
import {selectAuthUserToken, selectUser} from "@/store/selectors/index.js";
import * as yup from "yup";
import axios from "axios";
import {API_URL} from "@/config/config.js";

const EditPassword = () => {
    const userToken = useSelector(selectAuthUserToken);
    const userId = useSelector(selectUser).id;

    const initialValues = {
        currentPassword: '',
        newPassword: '',
    }

    const validationSchema = yup.object().shape({
        currentPassword: yup.string().required('Your current password is required'),
        newPassword: yup.string().required('Your new password is required'),
    });

    const handleSubmit = async (values, {resetForm}) => {
        try {
            const response = await axios.put(
                `${API_URL}/users/${userId}/update-password`,
                values,
                {
                    headers: {
                        Authorization: `${userToken}`
                    }
                }
            );

            console.log('User password updated successfully:', response.data);
            resetForm();
        } catch (error) {
            console.error('An error occurred while editing user password:', error.response?.data || error.message);
        }
    }

    return (
        <section>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <Form className={style.form}>
                    <div className={style.inputsWrapper}>
                        <InputField name='currentPassword' placeholder='Your current password'/>
                        <InputField name='newPassword' placeholder='Your new password'/>
                    </div>

                    <Button
                        type='submit'
                        variant='primary'
                        size='large'
                        className={style.editPasswordBtn}
                    >
                        Save New Password
                    </Button>
                </Form>
            </Formik>
        </section>
    );
};

export default EditPassword