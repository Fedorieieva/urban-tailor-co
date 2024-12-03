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
                    }
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
                    }
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

export const useFetchReviewByAppointmentId = (appointmentId) => {
    const [review, setReview] = useState({});

    useEffect(() => {
        const fetchReviewByAppointmentId = async () => {
            try {
                const response = await axios.get(`${API_URL}/reviews/appointment/${appointmentId}`);

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