import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import cn from 'classnames';
import style from './style.module.scss';

const Button = (props) => {
    const {
        children,
        className = '',
        type = 'button',
        onClick,
        shadow = false,
        size = 'small',
        variant = 'primary',
        to,
        isFullWidth = false,
        ...restProps
    } = props;
    const Component = to ? Link : 'button';

    const buttonClasses = cn(
        style.button,
        style[size],
        style[variant],
        {[style.shadow]: shadow},
        {[style.fullWidth]: isFullWidth},
        className
    );

    return (
        <Component
            to={to}
            type={!to ? type : undefined}
            onClick={!to ? onClick : undefined}
            className={buttonClasses}
            {...restProps}
        >
            {children}
        </Component>
    );
};

Button.propTypes = {
    children: PropTypes.any,
    type: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['small', 'large']),
    shadow: PropTypes.bool,
    isFullWidth: PropTypes.bool,
    variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'quaternary', 'transparent']),
    to: PropTypes.string
}

export default Button

