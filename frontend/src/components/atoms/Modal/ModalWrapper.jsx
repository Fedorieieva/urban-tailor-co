import React from "react";
import PropTypes from "prop-types";

import style from './style.module.scss'

const ModalWrapper = ({children, onClick}) => {
    return (
        <div className={style.modalWrapper} onClick={onClick}>
            {children}
        </div>
    );
};


ModalWrapper.propTypes = {
    children: PropTypes.any,
    onClick: PropTypes.func
}

export default ModalWrapper