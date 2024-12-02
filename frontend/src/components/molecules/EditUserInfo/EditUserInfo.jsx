import React, {useState} from "react";
import style from './style.module.scss';
import {useSelector} from "react-redux";
import {selectUser} from "@/store/selectors/index.js";
import {Form, Formik} from "formik";
import * as yup from 'yup';
import InputField from "../../atoms/InputField/InputField.jsx";
import Button from "../../atoms/Button/Button.jsx";
import EditPassword from "@/components/molecules/EditPassword/EditPassword.jsx";
import {useEditUserInfo} from "@/hooks/handleUser.js";

const EditUserInfo = () => {
    const userInfo = useSelector(selectUser);
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

    const handleSubmit = useEditUserInfo();

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
