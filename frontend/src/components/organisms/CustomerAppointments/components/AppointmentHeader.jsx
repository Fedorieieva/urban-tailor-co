import React from "react";
import style from './style.module.scss';
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import cn from 'classnames'

const AppointmentHeader = () => {
    return (
        <div className={cn(style.row, style.header)}>
            <div className={style.column}>
                <Typography variant='text-sm' clssName={style.headerText}>
                    Booked On
                </Typography>
            </div>
            <div className={style.column}>
                <Typography variant='text-sm' clssName={style.headerText}>
                    Appointment Date
                </Typography>
            </div>
            <div className={style.column}>
                <Typography variant='text-sm' clssName={style.headerText}>
                    Appointment Time
                </Typography>
            </div>
            <div className={style.column}>
                <Typography variant='text-sm' clssName={style.headerText}>
                    Tailoring Type
                </Typography>
            </div>
            <div className={style.column}>
                <Typography variant='text-sm' clssName={style.headerText}>
                    Amount of Items
                </Typography>
            </div>
            <div className={style.column}>
                <Typography variant='text-sm' className={style.headerText}>
                    Status
                </Typography>
            </div>
        </div>
    );
};

export default AppointmentHeader