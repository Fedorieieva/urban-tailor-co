import React, {useEffect, useState} from "react";
import UserProfile from "../components/organisms/UserProfile/UserProfile.jsx";
import Post from "../components/organisms/Post/Post.jsx";
import axios from "axios";
import {API_URL} from "../config/config.js";
import {useSelector} from "react-redux";
import {selectAuthUserToken, selectUser} from "../store/selectors/index.js";
import UserProfileFeed from "../components/organisms/UserProfileFeed/UserProfileFeed.jsx";
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