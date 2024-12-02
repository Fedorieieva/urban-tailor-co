const prisma = require('../config/prisma');

const validStatuses = [
    'pending',
    'confirmed',
    'in_progress',
    'canceled',
    'rescheduled',
    'in_review'
];

const validSortFields = [
    'status',
    'appointmentDate',
    'appointmentTime',
    'orderType',
    'tailoringItems',
];

exports.createAppointment = async (data) => {
    const {customerId, appointmentDate, orderType, tailoringItems, comment, appointmentTime} = data;

    if (!customerId || !appointmentDate || !orderType) {
        throw new Error("Required fields are missing.");
    }

    return prisma.appointments.create({
        data: {
            customerId,
            status: 'pending',
            appointmentDate,
            appointmentTime,
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

exports.getAllAppointments = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [appointments, total] = await Promise.all([
        prisma.appointments.findMany({skip, take: limit}),
        prisma.appointments.count(),
    ]);

    return {total, appointments};
};

exports.getAppointmentById = async (id) => {
    return prisma.appointments.findUnique({
        where: {
            id: String(id),
        },
    });
};

exports.getAppointmentByStatus = async (status, page = 1, limit = 10, sortBy = 'appointmentDate') => {
    if (!validStatuses.includes(status)) {
        throw new Error("Invalid appointment status.");
    }

    const skip = (page - 1) * limit;

    const orderByField = validSortFields.includes(sortBy) ? sortBy : 'appointmentDate';

    const [appointments, total] = await Promise.all([
        prisma.appointments.findMany({
            where: {status},
            skip,
            take: limit,
            orderBy: {
                [orderByField]: 'asc',
            }
        }),
        prisma.appointments.count({where: {status}}),
    ]);

    return {total, appointments};
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

exports.getAppointmentsByUser = async (userId, page = 1, limit = 10, sortBy = 'appointmentDate') => {
    const skip = (page - 1) * limit;

    const orderByField = validSortFields.includes(sortBy) ? sortBy : 'appointmentDate';

    const [appointments, total] = await Promise.all([
        prisma.appointments.findMany({
            where: {customerId: String(userId)},
            skip,
            take: limit,
            orderBy: {
                [orderByField]: 'asc',
            },
        }),
        prisma.appointments.count({where: {customerId: String(userId)}}),
    ]);

    return {total, appointments};
};

exports.getAppointmentsByTailor = async (tailorId, page = 1, limit = 10, sortBy = 'appointmentDate') => {
    const skip = (page - 1) * limit;
    const orderByField = validSortFields.includes(sortBy) ? sortBy : 'appointmentDate';

    const [appointments, total] = await Promise.all([
        prisma.appointments.findMany({
            where: {tailorId: String(tailorId)},
            skip,
            take: limit,
            orderBy: {
                [orderByField]: 'asc',
            },
        }),
        prisma.appointments.count({where: {tailorId: String(tailorId)}}),
    ]);

    return {total, appointments};
};