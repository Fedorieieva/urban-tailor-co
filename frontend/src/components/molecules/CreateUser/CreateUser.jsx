import React from "react";
import style from './style.module.scss';
import {Form, Formik} from "formik";
import * as yup from 'yup';
import {useCreateUser} from "@/hooks/handleUser.js";
import Button from "@/components/atoms/Button/Button.jsx";
import {InputField, SelectField} from "@/components/atoms/InputField/index.js";
import Typography from "@/shared/ui/Typography/Tupography.jsx";

const CreateUser = () => {
    const options = [
        {value: "admin", label: "Admin"},
        {value: "tailor", label: "Tailor"},
    ];

    const initialValues = {
        username: '',
        password: '',
        email: '',
        userType: ''
    };

    const validationSchema = yup.object().shape({
        username: yup.string().required("User name is required"),
        password: yup.string().required("Password is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        userType: yup.string().oneOf(['admin', 'tailor']).required('User role is required')
    });

    const handleSubmit = useCreateUser(true);

    return (
        <section>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <Form className={style.form}>
                    <div className={style.inputsWrapper}>
                        <InputField name='username' placeholder='Enter User name'/>
                        <InputField name='email' placeholder='Enter email'/>

                        <SelectField
                            name="userType"
                            options={options}
                            placeholder="Select User Role"
                        />

                        <InputField type='password' name='password' placeholder='Enter password'/>
                    </div>

                    <Button type='submit'>
                        <Typography variant='text-xs' bold uppercase>Create user</Typography>
                    </Button>
                </Form>
            </Formik>
        </section>
    );
};

export default CreateUser