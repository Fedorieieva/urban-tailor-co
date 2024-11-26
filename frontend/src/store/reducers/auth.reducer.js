import React from "react";
import {createSlice} from "@reduxjs/toolkit";
import {API_URL} from "../../config/config.js";
import axios from "axios";

const initialState = {
    userToken: '',
    user: {},
    loader: true
}

export const fetchAuth = (credentials) => async (dispatch) => {
    dispatch(actionUserLoader(true));

    try {
        const response = await axios.post(`${API_URL}/users/login`, credentials);

        if (response.data.success) {
            const token = response.data.token;
            const id = response.data.id;

            dispatch(actionUserToken(token));

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            dispatch(fetchUser(id));
        }
    } catch (error) {
        console.error("Login error:", error.response ? error.response.data : error.message);
    } finally {
        dispatch(actionUserLoader(false));
    }
};

export const fetchUser = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/users/${id}`);

        if (response.data) {
            const user = response.data;
            dispatch(actionUserData(user));
        }
    } catch (error) {
        console.error('Error fetching user info:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        actionUserData: (state, {payload}) => {
            state.user = payload;
            console.log(state.user);
        },
        actionUserToken: (state, {payload}) => {
            state.userToken = payload;
        },
        actionUserLoader: (state, {payload}) => {
            state.loader = payload;
        }
    }
});


export const {
    actionUserData,
    actionUserLoader,
    actionUserToken
} = userSlice.actions;
export default userSlice.reducer;
