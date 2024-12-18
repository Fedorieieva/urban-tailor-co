import React from 'react';
import PropTypes from "prop-types";
import cn from 'classnames'
import Close from '../../../../public/images/icons/close.svg?react';
import Button from "../Button/Button.jsx";


const ModalClose = (props) => {
    const {onClick, className} = props;

    return (
        <Button className={cn(className)} onClick={onClick} variant='transparent'>
            <Close/>
        </Button>
    )
}

ModalClose.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
}

export default ModalClose


