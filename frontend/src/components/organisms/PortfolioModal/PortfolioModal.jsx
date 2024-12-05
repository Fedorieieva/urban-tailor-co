import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import {ModalBody, ModalClose, ModalHeader, ModalWrapper} from "@/components/atoms/Modal/index.js";
import style from './style.module.scss';
import Portfolio from "@/components/organisms/Portfolio/Portfolio.jsx";

const PortfolioModal = ({tailorId, onClose}) => {
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
            >
                <ModalHeader className={style.modalHeader}>
                    <ModalClose onClick={onClose} className={style.modalClose}/>
                </ModalHeader>

                <ModalBody className={style.modalBody}>
                    <Portfolio tailorId={tailorId}/>
                </ModalBody>
            </div>
        </ModalWrapper>,
        document.body
    );

};

export default PortfolioModal