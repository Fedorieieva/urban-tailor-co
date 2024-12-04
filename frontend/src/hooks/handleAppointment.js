import {useEffect, useState} from "react";
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

export const useFetchUserAppointments = (userId, page = 1, limit = 10, sortBy = 'appointmentDate') => {
    const [appointments, setAppointments] = useState([]);
    const [total, setTotal] = useState();
    const params = {
        page, limit, sortBy
    }

    useEffect(() => {
        const getUserAppointments = async () => {
            try {
                const response = await axios.get(`${API_URL}/appointments/user/${userId}`, {
                    params,
                });

                setAppointments(response.data.appointments);
                setTotal(response.data.total);
                console.log("Got user appointments:", response.data.appointments);
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
    }, [userId, page, limit, sortBy]);

    return {appointments, total};
};

export const useFetchTailorAppointments = (tailorId, page = 1, limit = 10, sortBy = 'appointmentDate') => {
    const [appointments, setAppointments] = useState([]);
    const [total, setTotal] = useState();
    const params = {
        page, limit, sortBy
    }

    useEffect(() => {
        const getTailorAppointments = async () => {
            try {
                const response = await axios.get(`${API_URL}/appointments/tailor/${tailorId}`, {
                    params,
                });

                setAppointments(response.data.appointments);
                setTotal(response.data.total);
                console.log("Got tailor appointments:", response.data.appointments);
            } catch (error) {
                console.error(
                    "An error occurred while getting tailor appointments:",
                    error.response?.data || error.message
                );
            }
        };

        if (tailorId) {
            getTailorAppointments();
        }
    }, [tailorId, page, limit, sortBy]);

    return {appointments, total};
}

export const useFetchPendingAppointments = (page = 1, limit = 10, sortBy = 'appointmentDate') => {
    const [appointments, setAppointments] = useState([]);
    const [total, setTotal] = useState();
    const params = {
        status: 'pending', page, limit, sortBy
    }

    useEffect(() => {
        const getPendingAppointments = async () => {
            try {
                const response = await axios.get(`${API_URL}/appointments/status`,
                    {params}
                );

                setAppointments(response.data.appointments);
                setTotal(response.data.total);
                console.log("Got pending appointments:", response.data.appointments);
            } catch (error) {
                console.error(
                    "An error occurred while getting pending appointments:",
                    error.response?.data || error.message
                );
            }
        };

        getPendingAppointments();
    }, [page, limit, sortBy]);

    return {appointments, total};
}

export const useAssignAppointmentToTailor = () => {
    const userToken = useSelector(selectAuthUserToken);
    const tailorId = useSelector(selectUser).id;

    return async (appointmentId) => {
        try {
            const response = await axios.put(
                `${API_URL}/appointments/${appointmentId}/tailor`,
                {tailorId},
                {
                    headers: {
                        Authorization: `${userToken}`
                    }
                }
            );

            console.log("Appointment assigned successfully");
        } catch (error) {
            console.error(
                "An error occurred while assigning appointment:",
                error.response?.data || error.message
            );
        }

        try {
            const response = await axios.put(
                `${API_URL}/appointments/${appointmentId}`,
                {status: 'in_review'},
                {
                    headers: {
                        Authorization: `${userToken}`
                    }
                }
            );

            console.log("Appointment status changed to in review successfully");
        } catch (error) {
            console.error(
                "An error occurred while changing appointment status to in review:",
                error.response?.data || error.message
            );
        }
    }
}

export const useChangeAppointmentStatus = () => {
    const userToken = useSelector(selectAuthUserToken);

    return async (appointmentId, status) => {
        try {
            const response = await axios.put(
                `${API_URL}/appointments/${appointmentId}`,
                {status},
                {
                    headers: {
                        Authorization: `${userToken}`
                    }
                }
            );

            console.log("Appointment status changed successfully");
        } catch (error) {
            console.error(
                "An error occurred while changing appointment status:",
                error.response?.data || error.message
            );
        }
    }
};
