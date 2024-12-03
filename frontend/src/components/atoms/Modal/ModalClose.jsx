import React from 'react';
import PropTypes from "prop-types";
import cn from 'classnames'

import Button from "../Button/Button.jsx";


const ModalClose = (props) => {
    const {onClick, className} = props;

    return (
        <Button className={cn(className)} onClick={onClick} variant='transparent'>
            <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 1L1 15M15 15L1 1.00001" stroke="#3C4242" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        </Button>
    )
}

ModalClose.propTypes = {
    onClick: PropTypes.func
}

export default ModalClose


