const prisma = require('../config/prisma');

const validStatuses = ['pending', 'confirmed', 'in_progress', 'canceled', 'rescheduled', 'in_review'];

exports.createAppointment = async (data) => {
    const {customerId, status, appointmentDate, orderType, tailoringItems, comment} = data;

    if (!customerId || !status || !appointmentDate || !orderType) {
        throw new Error("Required fields are missing.");
    }

    if (!validStatuses.includes(status)) {
        throw new Error("Invalid appointment status.");
    }


    return prisma.appointments.create({
        data: {
            customerId,
            status,
            appointmentDate,
            orderType,
            tailoringItems,
            comment,
        },
    });
};

exports.updateAppointmentStatus = async (appointmentId, appointmentStatus) => {
    return prisma.appointments.update({
        where: {
            id: String(appointmentId),
        },
        data: {
            status: appointmentStatus,
        },
    });
};

exports.getAllAppointments = async () => {
    return prisma.appointments.findMany();
};

exports.getAppointmentById = async (id) => {
    return prisma.appointments.findUnique({
        where: {
            id: String(id),
        },
    });
};

exports.getAppointmentByStatus = async (status) => {
    if (!validStatuses.includes(status)) {
        throw new Error("Invalid appointment status.");
    }

    return prisma.appointments.findMany({
        where: {
            status: status,
        },
    });
};

exports.deleteAppointment = async (id) => {
    return prisma.appointments.delete({
        where: {
            id: String(id),
        },
    });
};

exports.assignAppointment = async (tailorId, appointmentId) => {
    return prisma.appointments.update({
        where: {
            id: String(appointmentId),
        },
        data: {
            tailorId: String(tailorId),
        },
    });
};

exports.getAppointmentsByUser = async (userId) => {
    return prisma.appointments.findMany({
        where: {
            customerId: String(userId),
        },
    });
};