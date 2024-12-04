import React from 'react';
import PropTypes from 'prop-types';
import Button from "@/components/atoms/Button/Button.jsx";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import SortIcon from '../../../../../public/images/icons/sort.svg?react';
import style from "./style.module.scss";
import cn from 'classnames';

const AppointmentsListHeader = ({onSortChange}) => {
    const columns = [
        {label: 'Booked On', key: 'bookedOn'},
        {label: 'Date', key: 'appointmentDate'},
        {label: 'Time', key: 'appointmentTime'},
        {label: 'Tailoring Type', key: 'orderType'},
        {label: '№ of Items', key: 'tailoringItems'},
        {label: 'Status', key: 'status'},
    ];

    return (
        <div className={cn(style.row, style.header)}>
            {columns.map(({label, key}) => (
                <div className={style.column} key={key}>
                    <Button variant='transparent' onClick={() => onSortChange(key)}>
                        <Typography variant="text-sm" black capitalize>{label}</Typography>
                        <SortIcon/>
                    </Button>
                </div>
            ))}
        </div>
    );
};

AppointmentsListHeader.propTypes = {
    onSortChange: PropTypes.func.isRequired,
};

export default AppointmentsListHeader;
