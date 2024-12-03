import React, {useState} from "react";
import AppointmentRow from "@/components/organisms/CustomerAppointments/components/AppointmentRow.jsx";
import PropTypes from "prop-types";
import {useFetchUserAppointments} from "@/hooks/handleAppointment.js";
import cn from "classnames";
import style from "@/components/organisms/CustomerAppointments/components/style.module.scss";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import Button from "@/components/atoms/Button/Button.jsx";
import SortIcon from '../../../../../public/images/icons/sort.svg?react';
import ReviewModal from "@/components/organisms/CustomerAppointments/components/ReviewModal.jsx";

const AppointmentsList = ({userId, review = false}) => {
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('orderType');
    const limit = 10;
    const {appointments, total} = useFetchUserAppointments(userId, page, limit, sort);
    const [chosenAppointment, setChosenAppointment] = useState(null);
    const [isModal, setIsModal] = useState(false);

    const totalPages = Math.ceil(total / limit);

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    const handleSortChange = (newSort) => {
        setSort(newSort);
        setPage(1);
    };

    const handleAppointmentClick = (appointmentId) => {
        setChosenAppointment(appointmentId);
        setIsModal(true);
    }

    return (
        <section>
            <div className={cn(style.row, style.header)}>
                <div className={style.column}>
                    <Typography variant="text-sm" black>Booked On</Typography>
                </div>
                <div className={style.column}>
                    <Button variant='transparent' onClick={() => handleSortChange("appointmentDate")}>
                        <Typography variant="text-sm" black capitalize>Date</Typography>
                        <SortIcon/>
                    </Button>
                </div>
                <div className={style.column}>
                    <Button variant='transparent' onClick={() => handleSortChange("appointmentTime")}>
                        <Typography variant="text-sm" black capitalize>Time</Typography>
                        <SortIcon/>
                    </Button>
                </div>
                <div className={style.column}>
                    <Button variant='transparent' onClick={() => handleSortChange("orderType")}>
                        <Typography variant="text-sm" black capitalize>Tailoring Type</Typography>
                        <SortIcon/>
                    </Button>
                </div>
                <div className={style.column}>
                    <Button variant='transparent' onClick={() => handleSortChange("tailoringItems")}>
                        <Typography variant="text-sm" black capitalize>№ of Items</Typography>
                        <SortIcon/>
                    </Button>
                </div>
                <div className={style.column}>
                    <Button variant='transparent' onClick={() => handleSortChange("status")}>
                        <Typography variant="text-sm" black capitalize>Status</Typography>
                        <SortIcon/>
                    </Button>
                </div>
            </div>

            <div className={style.list}>
                {appointments.map((item) => (
                    review ? (
                        <Button
                            variant='transparent'
                            isFullWidth
                            onClick={() => handleAppointmentClick(item.id)}
                            className={style.appointmentBtn}
                        >
                            <AppointmentRow appointment={item} key={item.id}/>
                        </Button>
                    ) : (
                        <AppointmentRow appointment={item} key={item.id}/>
                    )
                ))}
            </div>

            <div className={style.pagination}>
                <Button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                >
                    {`<`}
                </Button>

                <Typography variant="text-sm">
                    Page {page} of {totalPages}
                </Typography>

                <Button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                >
                    >
                </Button>
            </div>

            {isModal && <ReviewModal onClose={() => setIsModal(false)} appointmentId={chosenAppointment}/>}
        </section>
    );
};

AppointmentsList.propTypes = {
    userId: PropTypes.string,
    review: PropTypes.bool,
}

export default AppointmentsList