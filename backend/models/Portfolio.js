const prisma = require('../config/prisma');

exports.createPortfolio = async (data) => {
    const {tailorId, imgUrls, description} = data;

    if (!tailorId || !imgUrls || !description) {
        throw new Error("Required fields are missing.");
    }

    return prisma.portfolios.create({
        data: {
            tailorId,
            imgUrls,
            description,
        },
    });
};

exports.updatePortfolio = async (portfolioId, data) => {
    return prisma.portfolios.update({
        where: {
            id: String(portfolioId),
        },
        data,
    });
};

exports.getTailorPortfolio = async (tailorId, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [portfolios, total] = await Promise.all([
        prisma.portfolios.findMany({
            where: {
                tailorId: String(tailorId),
            },
            skip,
            take: limit
        }),
        prisma.portfolios.count({where: {tailorId: String(tailorId)}}),
    ]);

    return {total, portfolios};
};

exports.getAllPortfolios = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [portfolios, total] = await Promise.all([
        prisma.portfolios.findMany({skip, take: limit}),
        prisma.portfolios.count(),
    ]);

    return {total, portfolios};
};

exports.deletePortfolio = async (id) => {
    return prisma.portfolios.delete({
        where: {
            id: String(id),
        },
    });
};

exports.getPortfolioById = async (id) => {
    return prisma.portfolios.findUnique({
        where: {
            id: String(id)
        }
    });
};

exports.portfolioExists = async (tailorId) => {
    return prisma.portfolios.findFirst({
        where: {tailorId: tailorId},
    });
}