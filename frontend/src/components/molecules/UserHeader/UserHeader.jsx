import React from "react";
import RoundIcon from "@/components/atoms/RoundIcon/RoundIcon.jsx";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import PropTypes from "prop-types";
import style from './style.module.scss';
import cn from 'classnames';

const UserHeader = ({userAvatar, username, className}) => {
    return (
        <div className={cn(style.wrapper, className)}>
            <RoundIcon src={userAvatar} size='small'/>
            <Typography variant='text-sm'>{username}</Typography>
        </div>
    )
};

UserHeader.propTypes = {
    userAvatar: PropTypes.string,
    username: PropTypes.string,
    className: PropTypes.string,
}

export default UserHeader