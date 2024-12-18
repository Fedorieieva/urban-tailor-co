import React, {useState} from "react";
import Banner from "@/components/organisms/Banner/Banner.jsx";
import BookAppointment from "@/components/organisms/BookAppointment/BookAppointment.jsx";
import CustomerAppointments from "@/components/organisms/CustomerAppointments/CustomerAppointments.jsx";
import Container from "@/components/atoms/Container/Container.jsx";
import Button from "@/components/atoms/Button/Button.jsx";
import cn from "classnames";
import style from "@/pages/style.module.scss";

const Appointments = () => {
    const [tab, setTab] = useState('booking');

    return (
        <>
            <Banner title='Your Appointments' bannerImg='../../public/images/appointments-banner.png'/>

            <Container dark>
                <div className={style.tabs}>
                    <Button
                        variant='transparent'
                        onClick={() => setTab('booking')}
                        className={cn({[style.tabsActive] : tab === 'booking'})}
                    >
                        book an appointment
                    </Button>
                    <Button
                        variant='transparent'
                        onClick={() => setTab('appointments')}
                        className={cn({[style.tabsActive] : tab === 'appointments'})}
                    >
                        my appointments
                    </Button>
                </div>
            </Container>

            {tab === 'booking' && <BookAppointment/>}
            {tab === 'appointments' && <CustomerAppointments/>}
        </>
    );
};


export  default Appointments