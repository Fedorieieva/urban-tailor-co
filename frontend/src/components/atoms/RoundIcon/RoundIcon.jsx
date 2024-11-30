import React from "react";
import PropTypes from "prop-types";
import cn from 'classnames';
import style from "./style.module.scss";

const RoundIcon = ({src, size = 'large'}) => {
    const avatar = src || './public/images/icons/user.svg';

    const avatarClasses = cn(
        style.userAvatarWrapper,
        {
            [style.small]: size === 'small',
            [style.medium]: size === 'medium',
            [style.dynamicSize]: size === 'large'
        }
    );

    return (
        <div className={avatarClasses}
             style={{backgroundImage: `url(${avatar})`}}
        />
    );
}

RoundIcon.propTypes = {
    src: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default RoundIcon;
