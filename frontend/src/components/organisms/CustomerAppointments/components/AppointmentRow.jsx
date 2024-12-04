import React, {useState} from "react";
import PropTypes from "prop-types";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import style from './style.module.scss';
import {SelectField} from "@/components/atoms/InputField/index.js";
import {useChangeAppointmentStatus} from "@/hooks/handleAppointment.js";

const AppointmentRow = ({appointment, tailorId}) => {
    const changeAppointmentStatus = useChangeAppointmentStatus();
    const [status, setStatus] = useState(appointment.status);

    const tailoringStatuses = [
        {value: "pending", label: "Pending"},
        {value: "confirmed", label: "Confirmed"},
        {value: "in_progress", label: "In Progress"},
        {value: "canceled", label: "Canceled"},
        {value: "rescheduled", label: "Rescheduled"},
        {value: "in_review", label: "In Review"},
    ];

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;

        try {
            await changeAppointmentStatus(appointment.id, newStatus);
            setStatus(newStatus);
        } catch (error) {
            console.error("Failed to update appointment status:", error);
        }
    };

    return (
        <div className={style.row}>
            <div className={style.column}>
                <Typography variant="text-sm" capitalize>
                    {appointment.updatedAt.slice(0, 10)}
                </Typography>
            </div>
            <div className={style.column}>
                <Typography variant="text-sm" capitalize>
                    {appointment.appointmentDate}
                </Typography>
            </div>
            <div className={style.column}>
                <Typography variant="text-sm" capitalize>
                    {appointment.appointmentTime}
                </Typography>
            </div>
            <div className={style.column}>
                <Typography variant="text-sm" capitalize>
                    {appointment.orderType}
                </Typography>
            </div>
            <div className={style.column}>
                <Typography variant="text-sm" capitalize>
                    {appointment.tailoringItems}
                </Typography>
            </div>

            <div className={style.column}>
                {tailorId ? (
                    <SelectField
                        name="appointmentStatus"
                        options={tailoringStatuses}
                        value={status}
                        onChange={handleStatusChange}
                    />
                ) : (
                    <Typography variant="text-sm" capitalize>
                        {status}
                    </Typography>
                )}
            </div>
        </div>
    );
};

AppointmentRow.propTypes = {
    appointment: PropTypes.object.isRequired,
    tailorId: PropTypes.string,
};

export default AppointmentRow;
