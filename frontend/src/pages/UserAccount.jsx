import React, {useEffect, useState} from "react";
import UserProfile from "../components/organisms/UserProfile/UserProfile.jsx";
import {useSelector} from "react-redux";
import {selectUser} from "../store/selectors/index.js";
import Button from "../components/atoms/Button/Button.jsx";
import {useParams} from "react-router-dom";

const UserAccount = () => {
    const {userId} = useParams();
    const loggedInUserId = useSelector(selectUser)?._id;
    const isCurrentUser = userId === undefined | loggedInUserId === userId;

    const renderActions = () => (
        isCurrentUser ? (
            <>
                <Button to='/profile/edit' variant='quaternary'>Edit Profile</Button>
                <Button variant='quaternary'>Saved Posts</Button>
            </>
        ) : (
            <Button variant='quaternary'>Follow</Button>
        )
    );

    return (
        <>
            <UserProfile renderActions={renderActions()} />
            <UserProfileFeed />
        </>
    );
};

export default UserAccount