import React, {useState} from "react";
import Banner from "@/components/organisms/Banner/Banner.jsx";
import Container from "@/components/atoms/Container/Container.jsx";
import style from "@/pages/style.module.scss";
import Button from "@/components/atoms/Button/Button.jsx";
import cn from "classnames";
import {AppointmentsList} from "@/components/organisms/CustomerAppointments/index.js";
import {useSelector} from "react-redux";
import {selectUser} from "@/store/selectors/index.js";

const TailorAppointments = () => {
    const tailorId = useSelector(selectUser).id;
    const [tab, setTab] = useState('pending');

    return (
        <>
            <Banner title='Appointments' bannerImg='/images/appointments-banner.png'/>

            <Container dark>
                <div className={style.tabs}>
                    <Button
                        variant='transparent'
                        onClick={() => setTab('pending')}
                        className={cn({[style.tabsActive]: tab === 'pending'})}
                    >
                        pending appointments
                    </Button>
                    <Button
                        variant='transparent'
                        onClick={() => setTab('tailor-appointments')}
                        className={cn({[style.tabsActive]: tab === 'tailor-appointments'})}
                    >
                        my tailoring appointments
                    </Button>
                </div>
            </Container>

            <Container dark>
                {tab === 'pending' && <AppointmentsList pending />}
                {tab === 'tailor-appointments' && <AppointmentsList tailorId={tailorId}/>}
            </Container>
        </>
    );
};

export default TailorAppointments