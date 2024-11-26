import React from "react";
import PropTypes from "prop-types";
import cn from 'classnames';
import UserAvatar from "../../atoms/UserAvatar/UserAvatar.jsx";
import style from './style.module.scss';
import {Link} from "react-router-dom";

const PostHeader = ({user, className}) => {
    return (
        <div className={cn(style.userInfo, className)}>
            <Link to={`/profile/${user._id}`} className={style.userLink}>
                <UserAvatar src={user.avatarUrl} size='small'/>
                <p>
                    <span>{user.firstName} </span>
                    <span>{user.lastName}</span>
                </p>
            </Link>
        </div>
    );
};

PostHeader.propTypes = {
    user: PropTypes.object,
    className: PropTypes.string,
    award: PropTypes.object
}

export default PostHeader