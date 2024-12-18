import React, {useEffect} from "react";
import {ModalBody, ModalClose, ModalHeader, ModalWrapper} from "@/components/atoms/Modal/index.js";
import ReactDOM from "react-dom";
import style from "./style.module.scss";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Button from "@/components/atoms/Button/Button.jsx";
import {useFetchReviewByAppointmentId, useMakeReview, useUpdateReview} from "@/hooks/handleReview.js";

const ReviewModal = ({onClose, appointmentId}) => {
    const review = useFetchReviewByAppointmentId(appointmentId);
    const submitReview = review?.id ? useUpdateReview(review.id) : useMakeReview(appointmentId);

    const initialValues = {
        comment: review?.comment || '',
        rating: review?.rating || ''
    };

    const validationSchema = Yup.object({
        comment: Yup.string().required('Review details are required'),
        rating: Yup.number()
            .min(0, 'Rating must be at least 0')
            .max(5, 'Rating cannot exceed 5')
            .required('Rating is required')
    });

    const handleSubmit = async (values, {resetForm}) => {
        try {
            await submitReview(values);
            resetForm();
        } catch (error) {
            console.error("Failed to submit review:", error);
        } finally {
            onClose();
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return ReactDOM.createPortal(
        <ModalWrapper onClick={onClose}>
            <div
                className={style.modal}
                onClick={(event) => event.stopPropagation()}
                onKeyDown={() => {}}
            >
                <ModalHeader className={style.modalHeader}>
                    <ModalClose onClick={onClose} className={style.modalClose}/>
                </ModalHeader>

                <ModalBody className={style.modalBody}>
                    <Typography variant="text-3xl" uppercase className={style.modalTitle}>
                        {review?.id ? 'Update your review' : 'Add your review'}
                    </Typography>

                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <Form className={style.form}>
                            <div className={style.rating}>
                                <Field
                                    type="number"
                                    name="rating"
                                    min="0"
                                    max="5"
                                    placeholder="Enter rating"
                                />
                                <ErrorMessage name="rating" component="div" className={style.error}/>
                            </div>

                            <div className={style.comment}>
                                <Field as="textarea" name="comment" placeholder="Your review details"/>
                                <ErrorMessage name="comment" component="div" className={style.error}/>
                            </div>

                            <Button type="submit" isFullWidth>
                                <Typography variant="text-xs" bold>
                                    {review?.id ? 'Update Review' : 'Add Review'}
                                </Typography>
                            </Button>
                        </Form>
                    </Formik>
                </ModalBody>
            </div>
        </ModalWrapper>,
        document.body
    );
};

export default ReviewModal;
