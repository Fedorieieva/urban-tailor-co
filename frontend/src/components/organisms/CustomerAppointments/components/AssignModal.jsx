import React, {useEffect} from "react";
import style from './style.module.scss';
import ReactDOM from "react-dom";
import {ModalBody, ModalClose, ModalHeader, ModalWrapper} from "@/components/atoms/Modal/index.js";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import Button from "@/components/atoms/Button/Button.jsx";
import {useAssignAppointmentToTailor} from "@/hooks/handleAppointment.js";

const AssignModal = ({onClose, appointment}) => {
    const assignAppointment = useAssignAppointmentToTailor();

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return ReactDOM.createPortal(
        <ModalWrapper onClick={onClose}>
            <div
                className={style.modal}
                onClick={(event) => event.stopPropagation()}
                onKeyDown={() => {}}
                role="dialog"
            >
                <ModalHeader className={style.modalHeader}>
                    <ModalClose onClick={onClose} className={style.modalClose}/>
                </ModalHeader>

                <ModalBody className={style.modalBody}>
                    <Typography variant="text-3xl" uppercase className={style.modalTitle}>
                        view customer comment on appointment and assign
                    </Typography>

                    {appointment.comment ? (
                        <>
                            <Typography variant="text-md" uppercase underline>
                                customer comment:
                            </Typography>

                            <Typography variant="text-sm" black className={style.modalText}>
                                {appointment.comment}
                            </Typography>
                        </>
                    ) : (
                        <Typography variant="text-sm" uppercase black underline className={style.modalText}>
                            customer did not give additional information
                        </Typography>)
                    }

                    <Button isFullWidth onClick={() => assignAppointment(appointment.id)}>
                        <Typography variant="text-xs" bold>
                            Assign appointment
                        </Typography>
                    </Button>
                </ModalBody>
            </div>
        </ModalWrapper>,
        document.body
    );
};

export default AssignModal;