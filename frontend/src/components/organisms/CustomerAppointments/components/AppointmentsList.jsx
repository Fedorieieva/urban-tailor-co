import React, {useState} from "react";
import AppointmentRow from "@/components/organisms/CustomerAppointments/components/AppointmentRow.jsx";
import PropTypes from "prop-types";
import {
    useFetchPendingAppointments,
    useFetchUserAppointments,
    useFetchTailorAppointments,
} from "@/hooks/handleAppointment.js";
import style from "@/components/organisms/CustomerAppointments/components/style.module.scss";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import Button from "@/components/atoms/Button/Button.jsx";
import ReviewModal from "@/components/organisms/CustomerAppointments/components/ReviewModal.jsx";
import AppointmentsListHeader from "@/components/organisms/CustomerAppointments/components/AppointmentsListHeader.jsx";
import AssignModal from "@/components/organisms/CustomerAppointments/components/AssignModal.jsx";

const AppointmentsList = ({userId, tailorId, review = false, pending = false}) => {
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('appointmentDate');
    const limit = 10;
    const {appointments, total} = tailorId
        ? useFetchTailorAppointments(tailorId, page, limit, sort)
        : (userId ? useFetchUserAppointments(userId, page, limit, sort)
            : useFetchPendingAppointments(page, limit, sort));
    const [chosenAppointment, setChosenAppointment] = useState(null);
    const [isModal, setModal] = useState('');

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

    const handleAppointmentClick = (appointment) => {
        setChosenAppointment(appointment);

        if (review) {
            setModal('review');
        } else if (pending) {
            setModal('assign');
        }
    }

    return (
        <section>
            <AppointmentsListHeader onSortChange={handleSortChange}/>

            <div className={style.list}>
                {appointments.map((item) => (
                    review ? (
                        <Button
                            variant='transparent'
                            isFullWidth
                            onClick={() => handleAppointmentClick(item)}
                            className={style.appointmentBtn}
                        >
                            <AppointmentRow appointment={item} key={item.id}/>
                        </Button>
                    ) : (pending ? (
                            <Button
                                variant='transparent'
                                isFullWidth
                                onClick={() => handleAppointmentClick(item)}
                                className={style.appointmentBtn}
                            >
                                <AppointmentRow appointment={item} key={item.id}/>
                            </Button>
                        ) : (tailorId ? (
                                <AppointmentRow appointment={item} tailorId={tailorId} key={item.id}/>
                        ) : (
                                <AppointmentRow appointment={item} key={item.id}/>
                            )
                        )
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

            {isModal === 'review' && <ReviewModal onClose={() => setModal('')} appointmentId={chosenAppointment.id}/>}
            {isModal === 'assign' && <AssignModal onClose={() => setModal('')} appointment={chosenAppointment}/>}
        </section>
    );
};

AppointmentsList.propTypes = {
    userId: PropTypes.string,
    review: PropTypes.bool,
}

export default AppointmentsList