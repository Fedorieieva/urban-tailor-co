const prisma = require('../config/prisma');

exports.createReview = async (data) => {
    return prisma.reviews.create({
        data,
    });
};

exports.updateReview = async (reviewId, data) => {
    return prisma.reviews.update({
        where: {
            id: String(reviewId),
        },
        data
    });
};

exports.deleteReview = async (reviewId) => {
    return prisma.reviews.delete({
        where: {
            id: String(reviewId)
        }
    });
};

exports.getAllReviews = async () => {
    return prisma.reviews.findMany();
};

exports.getReviewByAppointmentId = async (appointmentId) => {
    return prisma.reviews.findFirst({
        where: {
            appointmentId: String(appointmentId),
        }
    });
};

exports.getReviewById = async (id) => {
    return prisma.reviews.findUnique({
        where: {
            id: String(id),
        },
    });
};

exports.getUserReviews = async (userId) => {
    return prisma.reviews.findMany({
        where: {
            appointment: {
                customerId: String(userId),
            },
        },
        include: {
            appointment: true
        },
    });
};

exports.reviewExists = async (appointmentId) => {
    return prisma.reviews.findFirst({
        where: { appointmentId },
    });
}