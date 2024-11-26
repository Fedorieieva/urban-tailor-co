import React from "react";
import * as yup from "yup";
import {Form, Formik} from "formik";
import PropTypes from "prop-types";
import style from "./style.module.scss";
import InputField from "../../atoms/InputField/InputField.jsx";
import Button from "../../atoms/Button/Button.jsx";
import Send from '../../../../public/images/icons/send.svg?react';
import {API_URL} from "../../../config/config.js";
import axios from "axios";
import {useSelector} from "react-redux";
import {selectAuthUserToken} from "../../../store/selectors/index.js";

const AddComment = ({postId}) => {
    const userToken = useSelector(selectAuthUserToken);
    const initialValues = {
        content: ''
    };

    const validationSchema = yup.object().shape({
        content: yup.string().required('Comment is required')
    });

    const handleSubmit = async (values, {resetForm}) => {
        const newData = {
            post: postId,
            ...values
        };

        try {
            const response = await axios.post(
                `${API_URL}/comments`,
                newData,
                {
                    headers: {
                        Authorization: `${userToken}`
                    }
                }
            );

            console.log('Comment added successfully:', response.data);
            resetForm();
        } catch (error) {
            console.error('An error occurred while adding comment:', error.response?.data || error.message);
        }
    }

    return (
        <div className={style.addComment}>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <Form className={style.form}>
                    <InputField className={style.input} name="content" placeholder="Your comment..."/>

                    <Button
                        type='submit'
                        variant='transparent'
                        className={style.btn}
                    >
                        <Send/>
                    </Button>
                </Form>
            </Formik>
        </div>
    );
};

AddComment.propTypes = {
    postId: PropTypes.string
}

export default AddComment