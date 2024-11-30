import React from "react";
import Container from "@/components/atoms/Container/Container.jsx";
import style from './style.module.scss';
import AppointmentForm from "@/components/organisms/BookAppointment/components/AppointmentForm.jsx";
import SectionTitle from "@/components/molecules/SectionTitle/SectionTitle.jsx";

const BookAppointment = () => {
    return (
        <Container dark>
            <section className={style.bookingSection}>
                <SectionTitle mainTitle='Book your appointment' secondaryTitle='booking' isCentered className={style.title}/>
                <div className={style.imgWrapper}>
                    <img src="../../../../public/images/thread.png" alt="thread" className={style.img}/>
                </div>

                <AppointmentForm className={style.form}/>
            </section>
        </Container>
    );
};

export default BookAppointment