import React from "react";
import PropTypes from "prop-types";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import style from './style.module.scss';

const AppointmentRow = ({appointment}) => {
    return (
        <div className={style.row}>
            <div>
                <Typography>
                    {appointment.updatedAt.slice(0, 10)}
                </Typography>
            </div>
            <div>
                <Typography>
                    {appointment.appointmentDate}
                </Typography>
            </div>
            <div>
                <Typography>
                    {appointment.appointmentTime}
                </Typography>
            </div>
            <div>
                <Typography>
                    {appointment.appointmentTime}
                </Typography>
            </div>
            <div>
                <Typography>
                    {appointment.orderType}
                </Typography>
            </div>
            <div>
                <Typography>
                    {appointment.tailoringItems}
                </Typography>
            </div>
            <div>
                <Typography>
                    {appointment.status}
                </Typography>
            </div>
        </div>
    )
}

AppointmentRow.propTypes = {
    appointment: PropTypes.object
}

export default AppointmentRow