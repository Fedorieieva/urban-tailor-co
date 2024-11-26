import React, {useState} from "react";
import style from './style.module.scss';
import UserInfoItem from "../../molecules/UserInfoItem/UserInfoItem.jsx";

const UserProfile = ({renderActions}) => {
    return (
        <section className={style.userProfileSection}>
            <UserInfoItem />

            <div className={style.userActions}>
                {renderActions}
            </div>
        </section>
    );
};

export default UserProfile