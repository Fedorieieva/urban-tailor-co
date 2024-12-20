import {useSelector} from "react-redux";
import {selectAuthUserToken} from "@/store/selectors/index.js";
import axios from "axios";
import {API_URL} from "@/config/config.js";
import {useEffect, useState} from "react";

export const useMakeReview = (appointmentId) => {
    const userToken = useSelector(selectAuthUserToken);

    return async (values) => {
        const reviewData = {
            appointmentId,
            ...values
        };

        try {
            const response = await axios.post(
                `${API_URL}/reviews`,
                reviewData,
                {
                    headers: {
                        Authorization: `${userToken}`
                    },
                    withCredentials: true,
                }
            );

            console.log("Made review successfully:", response.data)
        } catch (error) {
            console.error(
                "An error occurred while making a review:",
                error.response?.data || error.message
            );
        }
    }
}

export const useUpdateReview = (reviewId) => {
    const userToken = useSelector(selectAuthUserToken);

    return async (values) => {
        console.log(values);

        try {
            const response = await axios.put(
                `${API_URL}/reviews/${reviewId}`,
                values,
                {
                    headers: {
                        Authorization: `${userToken}`
                    },
                    withCredentials: true,
                }
            );

            console.log("Updated review successfully:", response.data)
        } catch (error) {
            console.error(
                "An error occurred while updating review:",
                error.response?.data || error.message
            );
        }
    }
}

export const useFetchReviews = (page = 1, limit = 10) => {
    const [reviews, setReviews] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${API_URL}/reviews`, {
                    params: {page, limit},
                    withCredentials: true,
                });

                setReviews(response.data.reviews);
                setTotal(response.data.total);
                console.log("Fetched reviews successfully:", response.data.reviews);
            } catch (error) {
                console.error(
                    "An error occurred while fetching reviews:",
                    error.response?.data || error.message
                );
            }
        };

        fetchReviews();
    }, [page, limit]);

    return {reviews, total};
};

export const useFetchReviewByAppointmentId = (appointmentId) => {
    const [review, setReview] = useState({});

    useEffect(() => {
        const fetchReviewByAppointmentId = async () => {
            try {
                const response = await axios.get(`${API_URL}/reviews/appointment/${appointmentId}`, {
                    withCredentials: true,
                });

                setReview(response.data);
                console.log("Fetched review successfully:", response.data);
            } catch (error) {
                console.error(
                    "An error occurred while fetching review by appointment ID:",
                    error.response?.data || error.message
                );
                setReview({});
            }
        };

        if (appointmentId) {
            fetchReviewByAppointmentId();
        }
    }, [appointmentId]);

    return review;
};

export const fetchUserByReview = async (reviewId) => {
    try {
        const response = await axios.get(`${API_URL}/reviews/get-user/${reviewId}`, {
            withCredentials: true,
        });
        const portfolio = response.data;
        console.log("Got user by review:", response.data);
        return portfolio;
    } catch (error) {
        console.error(
            "An error occurred while getting user by review:",
            error.response?.data || error.message
        );
        throw error;
    }
}