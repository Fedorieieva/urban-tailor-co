import React from "react";
import {Field, Form, Formik, ErrorMessage} from "formik";
import * as Yup from "yup";
import style from './style.module.scss';
import Button from "@/components/atoms/Button/Button.jsx";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import cn from 'classnames';
import PropTypes from "prop-types";
import {useMakeAppointment} from "@/hooks/handleAppointment.js";
import {SelectField} from "@/components/atoms/InputField/index.js";

const AppointmentForm = ({className}) => {
    const tailoringOptions = [
        {value: "customAccessories", label: "Custom Accessories"},
        {value: "customTailoring", label: "Custom Tailoring"},
        {value: "suitResizing", label: "Suit Resizing"},
        {value: "designerAlterations", label: "Designer Alterations"},
        {value: "bridalAlterations", label: "Bridal Alterations"},
        {value: "dressRepair", label: "Dress Repair"},
    ];

    const initialValues = {
        orderType: '',
        appointmentDate: '',
        appointmentTime: '',
        tailoringItems: '',
        comment: ''
    };

    const validationSchema = Yup.object({
        orderType: Yup.string().required("Please select a tailoring type"),
        appointmentDate: Yup.date()
            .required("Please select a date")
            .min(new Date(new Date().setDate(new Date().getDate() + 1)), "Date cannot be today or in the past"),
        appointmentTime: Yup.string().required("Please select a time"),
        tailoringItems: Yup.number()
            .required("Please specify the number of items")
            .min(1, "Amount of items cannot be less than 1")
            .max(10, "Amount of items cannot be more than 10"),
        comment: Yup.string(),
    });

    const handleSubmit = useMakeAppointment();

    return (
        <div className={cn(style.formWrapper, className)}>
            <Typography variant="text-3xl" uppercase className={style.title}>
                Make an Appointment
            </Typography>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({touched, errors, submitCount}) => (
                    <Form className={style.form}>
                        <div className={style.appointmentInfo}>
                            {/* Date */}
                            <div className={style.date}>
                                <label htmlFor="date">Date</label>
                                <Field type="date" name="appointmentDate"/>
                                {submitCount > 0 && touched.date && errors.date && (
                                    <ErrorMessage name="date" component="div" className={style.error}/>
                                )}
                            </div>

                            {/* Time */}
                            <div className={style.time}>
                                <label htmlFor="time">Time</label>
                                <Field type="time" name="appointmentTime"/>
                                {submitCount > 0 && touched.time && errors.time && (
                                    <ErrorMessage name="time" component="div" className={style.error}/>
                                )}
                            </div>
                        </div>

                        <div className={style.tailoringInfo}>
                            <div>
                                <SelectField
                                    name="orderType"
                                    options={tailoringOptions}
                                    placeholder="Tailoring Type"
                                />
                                {submitCount > 0 && touched.tailoringType && errors.tailoringType && (
                                    <ErrorMessage name="tailoringType" component="div" className={style.error}/>
                                )}
                            </div>

                            <div className={style.amountOfItems}>
                                <Field
                                    type="number"
                                    name="tailoringItems"
                                    min="1"
                                    max="10"
                                    placeholder="Enter amount of items"
                                />
                                {submitCount > 0 && touched.amountOfItems && errors.amountOfItems && (
                                    <ErrorMessage name="amountOfItems" component="div" className={style.error}/>
                                )}
                            </div>
                        </div>

                        <div className={style.comment}>
                            <Field as="textarea" name="comment" placeholder="Add any additional details"/>
                        </div>

                        <Button type="submit" isFullWidth>
                            Book an Appointment
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

AppointmentForm.propTypes = {
    className: PropTypes.string
};

export default AppointmentForm;
