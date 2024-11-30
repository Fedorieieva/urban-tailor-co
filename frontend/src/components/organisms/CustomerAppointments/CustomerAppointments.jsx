import React from "react";
import Container from "@/components/atoms/Container/Container.jsx";
import SectionTitle from "@/components/molecules/SectionTitle/SectionTitle.jsx";
import style from './style.module.scss';
import {useFetchUserAppointments} from "@/hooks/handleAppointment.js";
import {useSelector} from "react-redux";
import {selectUser} from "@/store/selectors/index.js";
import AppointmentRow from "@/components/organisms/CustomerAppointments/components/AppointmentRow.jsx";

const CustomerAppointments = () => {
    const userId = useSelector(selectUser).id;
    const appointments = useFetchUserAppointments(userId);

    console.log(appointments);

    return(
        <Container light>
            <Container bgImage='../../../../public/images/appointmentsbg2.png' mask={false}>
                <SectionTitle mainTitle='your appointments' secondaryTitle='appointments' className={style.title}/>

                <div>
                    {appointments.map((item, id) => (
                        <AppointmentRow appointment={item}/>
                    ))}
                </div>
            </Container>
        </Container>
    );
};

export default CustomerAppointments