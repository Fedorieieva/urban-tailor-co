const Portfolio = require('../models/Portfolio');
const User = require("../models/User");

exports.createPortfolio = async (req, res, next) => {
    const {tailorId} = req.body;

    try {
        const user = await User.getUserById(tailorId);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const portfolio = Portfolio.createPortfolio(req.body);
        res.json(portfolio);
    } catch (error) {
        next(error);
    }
};

exports.getTailorPortfolio = async (req, res, next) => {
    const tailorId = req.params.id;
    const {page = 1, limit = 10} = req.query;

    try {
        const user = await User.getUserById(tailorId);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const {total, portfolios} = await Portfolio.getTailorPortfolio(tailorId, Number(page), Number(limit));
        res.json({total, portfolios});
    } catch (error) {
        next(error);
    }
}

exports.getPortfolio = async (req, res, next) => {
    const portfolioId = req.params.id;

    try {
        const portfolio = await Portfolio.getPortfolioById(portfolioId);

        if (!portfolio) {
            return res.status(404).json({message: 'Portfolio not found'});
        }

        res.json(portfolio);
    } catch (error) {
        next(error);
    }
}

exports.getAllPortfolios = async (req, res, next) => {
    const {page = 1, limit = 10} = req.query;

    try {
        const {total, portfolios} = await Portfolio.getAllPortfolios(Number(page), Number(limit));
        res.json({total, portfolios});
    } catch (error) {
        next(error);
    }
}

exports.updatePortfolio = async (req, res, next) => {
    const portfolioId = req.params.id;

    try {
        const portfolio = await Portfolio.getPortfolioById(portfolioId);

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        const updatedPortfolio = await Portfolio.updatePortfolio(portfolioId, req.body); // Pass both portfolioId and data
        res.json(updatedPortfolio);
    } catch (error) {
        next(error); 
    }
};

exports.deletePortfolio = async (req, res, next) => {
    const portfolioId = req.params.id;

    try {
        const portfolio = await Portfolio.getPortfolioById(portfolioId);

        if (!portfolio) {
            return res.status(404).json({message: 'Portfolio not found'});
        }

        await Portfolio.deletePortfolio(portfolioId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}