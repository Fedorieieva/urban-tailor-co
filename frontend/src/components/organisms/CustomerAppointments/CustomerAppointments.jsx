import React from "react";
import Container from "@/components/atoms/Container/Container.jsx";
import SectionTitle from "@/components/molecules/SectionTitle/SectionTitle.jsx";
import style from './style.module.scss';
import {useSelector} from "react-redux";
import {selectUser} from "@/store/selectors/index.js";
import AppointmentsList from "@/components/organisms/CustomerAppointments/components/AppointmentsList.jsx";
const CustomerAppointments = () => {
    const userId = useSelector(selectUser).id;

    return (
        <Container light>
            <Container bgImage='../../../../public/images/appointmentsbg2.png' mask={false}>
                <SectionTitle mainTitle='your appointments' secondaryTitle='appointments' className={style.title}/>

                <AppointmentsList userId={userId} review/>
            </Container>
        </Container>
    );
};

export default CustomerAppointments