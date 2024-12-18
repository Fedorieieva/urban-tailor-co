const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
    createPortfolio,
    getAllPortfolios,
    getPortfolio,
    getTailorPortfolio,
    updatePortfolio,
    deletePortfolio,
} = require('../controllers/portfolios');
const router = express.Router();


// @route   POST /api/portfolios
// @desc    Create portfolio
// @access  Private
router.post('/', authMiddleware, createPortfolio);

// @route   GET /api/portfolios
// @desc    GET all existing appointments
// @access  Public
router.get('/', getAllPortfolios);

// @route   GET /api/portfolios/:id
// @desc    GET existing portfolio
// @access  Public
router.get('/:id', getPortfolio);

// @route   GET /api/portfolios/tailor/:id
// @desc    GET existing tailor portfolio
// @access  Public
router.get('/tailor/:id', getTailorPortfolio);

// @route   PUT /api/portfolios/:id
// @desc    Update current portfolio
// @access  Private
router.put('/:id', authMiddleware, updatePortfolio);

// @route   DELETE /api/portfolios/:id
// @desc    Delete current portfolio
// @access  Private
router.delete('/:id', authMiddleware,  deletePortfolio);

module.exports = router;
