import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {API_URL} from "../config/config.js";
import {useDeleteImgFromCloudinary} from "./handleCloudinary.js";
import {actionSetUserData, actionSetUserToken, actionUserLoader} from "../store/reducers/auth.reducer.js";
import {useNavigate} from "react-router-dom";
import {selectAuthUserToken, selectUploadedProfileImage, selectUser} from "@/store/selectors/index.js";
import {actionClearProfileImageSrc} from "@/store/reducers/uploadedImage.slice.js";

export const useCreateUser = (isAdminCreating = false) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return async (values, {resetForm}) => {
        try {
            const response = await axios.post(`${API_URL}/users`,
                {
                    password: values.password,
                    email: values.email,
                    username: values.username,
                    userType: values.userType || "user",
                }
            );

            console.log('User created successfully:', response.data);
            resetForm();

            if (!isAdminCreating) {
                dispatch(actionSetUserData(response.data.user));
                dispatch(actionSetUserToken(response.data.token));
                navigate('/appointments');
            }
        } catch (error) {
            console.error('Registration error:', error.response.data);
        }
    };
};

export const useLogInUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchAuth = async (credentials) => {
        dispatch(actionUserLoader(true));
        try {
            const response = await axios.post(`${API_URL}/users/login`, credentials);
            console.log(response.data);
            if (response.data) {
                const token = response.data.token;
                const id = response.data.id;

                dispatch(actionSetUserToken(token));
                axios.defaults.headers.common['Authorization'] = `${token}`;

                await fetchUser(id);
            }
        } catch (error) {
            console.error("Login error:", error.response ? error.response.data : error.message);
        } finally {
            dispatch(actionUserLoader(false));
        }
    };

    const fetchUser = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/users/${id}`);

            if (response.data) {
                const user = response.data;
                dispatch(actionSetUserData(user));

                if (user.userType === 'user') {
                    navigate('/appointments');
                } else if (user.userType === 'tailor') {
                    navigate('/tailor-appointments');
                } else if (user.userType === 'admin') {
                    navigate('/');
                }
            }
        } catch (error) {
            console.error("Error fetching user info:", error.response ? error.response.data : error.message);
        }
    };

    return {fetchAuth};
};

export const useFetchUser = (userId) => {
    const [user, setUser] = useState(null);

    const fetchUserById = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/users/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.error(
                "Error fetching user by user ID:",
                error.response?.data || error.message
            );
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchUserById();
        }
    }, [userId, fetchUserById]);

    return user;
};

export const useEditUserInfo = () => {
    const dispatch = useDispatch();
    const userToken = useSelector(selectAuthUserToken);
    const userId = useSelector(selectUser).id;
    const userUploadedImg = useSelector(selectUploadedProfileImage);

    return async (values, {resetForm}) => {
        const oldAvatarUrl = values.userAvatar;
        const newAvatarUrl = userUploadedImg || values.userAvatar;

        const newData = {
            ...values,
            userAvatar: userUploadedImg || values.userAvatar
        };

        try {
            const response = await axios.put(
                `${API_URL}/users/${userId}`,
                newData,
                {
                    headers: {
                        Authorization: `${userToken}`
                    }
                }
            );

            console.log("Profile updated successfully:", response.data);
            dispatch(actionSetUserData(response.data));

            if (oldAvatarUrl && oldAvatarUrl !== newAvatarUrl) {
                await useDeleteImgFromCloudinary(oldAvatarUrl, userToken);
            }

            resetForm({values: response.data});
        } catch (error) {
            console.error('An error occurred while editing profile:', error.response?.data || error.message);
        } finally {
            dispatch(actionClearProfileImageSrc())
        }
    }
};

export const useEditUserPassword = () => {
    const userToken = useSelector(selectAuthUserToken);
    const userId = useSelector(selectUser).id;

    return async (values, {resetForm}) => {
        try {
            const response = await axios.put(
                `${API_URL}/users/${userId}/update-password`,
                values,
                {
                    headers: {
                        Authorization: `${userToken}`
                    }
                }
            );

            console.log('User password updated successfully:', response.data);
            resetForm();
        } catch (error) {
            console.error('An error occurred while editing user password:', error.response?.data || error.message);
        }
    }
};

export const useFetchUsersByRole = (role) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!role) {
            setUsers([]);
            return;
        }

        const getAllUsers = async () => {
            try {
                const response = await axios.get(`${API_URL}/users/role/${role}`);
                setUsers(response.data);
            } catch (error) {
                setError(error.response?.data || error.message);
                console.error("Error fetching users:", error.response?.data || error.message);
            }
        };

        getAllUsers();
    }, [role]);

    console.log(users);
    return users;
};