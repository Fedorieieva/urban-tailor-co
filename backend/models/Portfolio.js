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

exports.getTailorPortfolio = async (tailorId) => {
    return prisma.portfolios.findMany({
        where: {
            tailorId: String(tailorId),
        }
    });
};

exports.getAllPortfolios = async () => {
    return prisma.portfolios.findMany();
}

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