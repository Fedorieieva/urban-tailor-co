import React from "react";
import PropTypes from "prop-types";
import cn from 'classnames';

const ModalHeader = (props) => {
    const {children, className} = props;

    return(
        <div className={cn(className)}>
            {children}
        </div>
    )
}

ModalHeader.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
}

export default ModalHeader

