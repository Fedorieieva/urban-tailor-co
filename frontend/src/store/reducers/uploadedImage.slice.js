import React from "react";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    profileImgSrc: '',
    postImgSrc: []
};

export const uploadImageSlice = createSlice({
    name: 'uploadImage',
    initialState,
    reducers: {
        actionSetProfileImageSrc: (state, { payload }) => {
            state.profileImgSrc = payload;
            console.log('state: ', state.profileImgSrc);
        },
        actionClearProfileImageSrc: (state) => {
            state.profileImgSrc = '';
        },
        actionSetPostImageSrc: (state, { payload }) => {
            state.postImgSrc = payload;
        },
        actionClearPostImageSrc: (state) => {
            state.postImgSrc = [];
        }
    }
});

export const {
    actionSetProfileImageSrc,
    actionClearProfileImageSrc,
    actionSetPostImageSrc,
    actionClearPostImageSrc
} = uploadImageSlice.actions;
export default uploadImageSlice.reducer;