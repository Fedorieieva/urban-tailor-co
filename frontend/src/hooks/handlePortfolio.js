import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthUserToken, selectUploadedPostImages, selectUser} from "@/store/selectors/index.js";
import axios from "axios";
import {API_URL} from "@/config/config.js";
import {actionClearPostImageSrc} from "@/store/reducers/uploadedImage.slice.js";
import {deleteImageFromCloudinary} from "@/hooks/handleCloudinary.js";

export const useCreatePortfolio = () => {
    const userToken = useSelector(selectAuthUserToken);
    const tailorId = useSelector(selectUser).id;
    const imgUrls = useSelector(selectUploadedPostImages);
    const dispatch = useDispatch();

    // return async (values, {resetForm}) => {
    return async (values) => {
        const portfolioData = {
            tailorId,
            imgUrls,
            ...values
        };

        try {
            const response = await axios.post(
                `${API_URL}/portfolios`,
                portfolioData,
                {
                    headers: {
                        Authorization: `${userToken}`
                    },
                    withCredentials: true,
                }
            );

            console.log("Portfolio made successfully:", response.data)
            // resetForm();
        } catch (error) {
            console.error(
                "An error occurred while making a portfolio:",
                error.response?.data || error.message
            );
        } finally {
            dispatch(actionClearPostImageSrc());
        }
    }
}

export const useFetchTailorPortfolio = (tailorId,triggerRerender) => {
    const [portfolio, setPortfolio] = useState({});

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await axios.get(`${API_URL}/portfolios/tailor/${tailorId}`,
                    {
                        withCredentials: true,
                    }
                );

                setPortfolio(response.data.portfolios[0]);
                console.log("Got tailor portfolio:", response.data);
            } catch (error) {
                console.error(
                    "An error occurred while getting tailor portfolio:",
                    error.response?.data || error.message
                );
            }
        }

        if (tailorId) {
            fetchPortfolio();
        }
    }, [tailorId, triggerRerender]);

    return portfolio;
}

export const fetchPortfolioById = async (portfolioId) => {
    try {
        const response = await axios.get(`${API_URL}/portfolios/${portfolioId}`, {
            withCredentials: true,
        });
        const portfolio = response.data;
        console.log("Got tailor portfolio:", response.data);
        return portfolio;
    } catch (error) {
        console.error(
            "An error occurred while getting portfolio by id:",
            error.response?.data || error.message
        );
        throw error;
    }
};

export const useUpdatePortfolio = () => {
    const userToken = useSelector(selectAuthUserToken);
    const uploadedImgUrls = useSelector(selectUploadedPostImages);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const editPortfolio = async (portfolioId, data) => {
        setIsEditing(true);

        const combinedImgUrls = [
            ...uploadedImgUrls,
            ...(data.imgUrls || [])
        ];

        const newData = {
            imgUrls: combinedImgUrls,
            description: data.description,
        };

        try {
            const response = await axios.put(
                `${API_URL}/portfolios/${portfolioId}`,
                newData,
                {
                    headers: {
                        Authorization: `${userToken}`,
                    },
                    withCredentials: true,
                }
            );
            console.log("Portfolio edited successfully:", response.data);

        } catch (error) {
            console.error(
                "An error occurred while editing portfolio:",
                error.response?.data || error.message
            );
        } finally {
            setIsEditing(false);
            dispatch(actionClearPostImageSrc());
        }
    };

    return {editPortfolio, isEditing};
};

export const useDeletePortfolio = () => {
    const userToken = useSelector(selectAuthUserToken);

    const deletePortfolio = async (portfolioId, portfolioImgs) => {
        try {
            for (const imgUrl of portfolioImgs) {
                await deleteImageFromCloudinary(imgUrl, userToken);
            }

            const response = await axios.delete(
                `${API_URL}/portfolios/${portfolioId}`,
                {
                    headers: {
                        Authorization: `${userToken}`,
                    },
                    withCredentials: true,
                }
            );
            console.log("Portfolio deleted successfully:", response.data);

        } catch (error) {
            console.error(
                "An error occurred while editing portfolio:",
                error.response?.data || error.message
            );
        }
    }

    return deletePortfolio;
}