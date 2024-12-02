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

exports.getAllReviews = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
        prisma.reviews.findMany({skip, take: limit}),
        prisma.reviews.count(),
    ]);

    return {total, reviews};
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

exports.getUserReviews = async (userId, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
        prisma.reviews.findMany({
            where: {
                appointment: {
                    customerId: String(userId),
                },
            },
            include: {
                appointment: true
            },
            skip,
            take: limit
        }),
        prisma.reviews.count({
            where: {
                appointment: {
                    customerId: String(userId),
                },
            }
        }),
    ]);

    return {total, reviews};
};

exports.reviewExists = async (appointmentId) => {
    return prisma.reviews.findFirst({
        where: { appointmentId },
    });
}