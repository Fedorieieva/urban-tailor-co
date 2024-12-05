import React from "react";
import {useSelector} from "react-redux";
import {selectIsLoadingImages} from "@/store/selectors/uploadImage.selectors.js";
import {Field, Form, Formik} from "formik";
import * as yup from 'yup';
import style from './style.module.scss';
import Button from "@/components/atoms/Button/Button.jsx";
import {useCreatePortfolio} from "@/hooks/handlePortfolio.js";

const CreatePortfolioForm = () => {
    const isLoadingImages = useSelector(selectIsLoadingImages);
    const initialValues = {
        description: ''
    };

    const validationSchema = yup.object().shape({
        description: yup.string().required('Description is required'),
    });

    const handleSubmit = useCreatePortfolio();

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            <Form >
                <div className={style.description}>
                    <Field
                        as="textarea"
                        name="description"
                        placeholder="Add any additional details about your work"
                    />
                </div>

                <Button
                    type='submit'
                    disabled={isLoadingImages}
                    className={style.submit}
                >
                    Create Portfolio
                </Button>
            </Form>
        </Formik>
    );
};

export default CreatePortfolioForm