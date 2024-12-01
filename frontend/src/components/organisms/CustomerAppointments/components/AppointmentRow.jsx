import React from "react";
import PropTypes from "prop-types";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import style from './style.module.scss';

const AppointmentRow = ({appointment}) => {
    return (
        <div className={style.row}>
            <div className={style.column}>
                <Typography variant='text-sm'>
                    {appointment.updatedAt.slice(0, 10)}
                </Typography>
            </div>
            <div className={style.column}>
                <Typography variant='text-sm'>
                    {appointment.appointmentDate}
                </Typography>
            </div>
            <div className={style.column}>
                <Typography variant='text-sm'>
                    {appointment.appointmentTime}
                </Typography>
            </div>
            <div className={style.column}>
                <Typography variant='text-sm'>
                    {appointment.orderType}
                </Typography>
            </div>
            <div className={style.column}>
                <Typography variant='text-sm'>
                    {appointment.tailoringItems}
                </Typography>
            </div>
            <div className={style.column}>
                <Typography variant='text-sm'>
                    {appointment.status}
                </Typography>
            </div>
        </div>
    );
};

AppointmentRow.propTypes = {
    appointment: PropTypes.object
}

export default AppointmentRow