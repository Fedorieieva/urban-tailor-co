import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectAuthUserToken, selectUser} from "@/store/selectors/index.js";
import axios from "axios";
import {API_URL} from "@/config/config.js";

export const useMakeAppointment = () => {
    const userToken = useSelector(selectAuthUserToken);
    const userId = useSelector(selectUser).id;

    return async (values, {resetForm}) => {
        const appointmentData = {
            customerId: userId,
            status: 'pending',
            ...values,
        }

        try {
            const response = await axios.post(
                `${API_URL}/appointments`,
                appointmentData,
                {
                    headers: {
                        Authorization: `${userToken}`
                    }
                }
            );

            console.log("Appointment made successfully");
            resetForm();
        } catch (error) {
            console.error(
                "An error occurred while making an appointment:",
                error.response?.data || error.message
            );
        }

    }
}

export const useFetchUserAppointments = (userId) => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const getUserAppointments = async () => {
            try {
                const response = await axios.get(`${API_URL}/appointments/user/${userId}`);
                setAppointments(response.data);
                console.log("Got user appointments:", response.data);
            } catch (error) {
                console.error(
                    "An error occurred while getting user appointments:",
                    error.response?.data || error.message
                );
            }
        };

        if (userId) {
            getUserAppointments();
        }
    }, [userId]);

    return appointments;
};

