import React from "react";
import AppointmentHeader from "@/components/organisms/CustomerAppointments/components/AppointmentHeader.jsx";
import AppointmentRow from "@/components/organisms/CustomerAppointments/components/AppointmentRow.jsx";
import PropTypes from "prop-types";
import {useFetchUserAppointments} from "@/hooks/handleAppointment.js";

const AppointmentsList = ({userId}) => {
    const appointments = useFetchUserAppointments(userId);

    return(
        <div>
            <AppointmentHeader/>
            {appointments.map((item) => (
                <AppointmentRow appointment={item} key={item.id}/>
            ))}
        </div>
    )
}

AppointmentsList.propTypes = {
    userId: PropTypes.string
}

export default AppointmentsList