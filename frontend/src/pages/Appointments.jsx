import React from "react";
import Banner from "@/components/organisms/Banner/Banner.jsx";
import BookAppointment from "@/components/organisms/BookAppointment/BookAppointment.jsx";
import CustomerAppointments from "@/components/organisms/CustomerAppointments/CustomerAppointments.jsx";

const Appointments = () => {
    return (
        <>
            <Banner title='Your Appointments' bannerImg='../../public/images/appointments-banner.png'/>
            <BookAppointment/>
            <CustomerAppointments/>
        </>
    );
};


export  default Appointments