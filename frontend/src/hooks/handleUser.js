import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {API_URL} from "../config/config.js";
import {actionSetUserData, actionSetUserToken, actionUserLoader} from "../store/reducers/auth.reducer.js";
import {useNavigate} from "react-router-dom";

export const useCreateUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return async (values) => {
        try {
            console.log(values);

            const response = await axios.post(`${API_URL}/users`, {
                password: values.password,
                email: values.email,
                username: values.username,
                userType: "user",
            });

            console.log('User created successfully:', response.data);
            dispatch(actionSetUserData(response.data.user));
            dispatch(actionSetUserToken(response.data.token));
            navigate('/appointments');
        } catch (error) {
            console.error('Registration error:', error.response.data);
        }
    };
};

export const useLogInUser = () => {
    const dispatch = useDispatch();

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

