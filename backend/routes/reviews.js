const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
    createReview,
    updateReview,
    deleteReview,
    getAllReviews,
    getReviewByAppointmentId,
    getReviewById,
    getReviewsByUserId,
    getUserByReviewId,
} = require('../controllers/reviews');
const router = express.Router();

// @route   POST /api/reviews
// @desc    Create review
// @access  Private
router.post('/', authMiddleware, createReview);

// @route   GET /api/reviews
// @desc    GET all existing reviews
// @access  Public
router.get('/', getAllReviews);

// @route   GET /api/reviews/:id
// @desc    GET existing review by id
// @access  Public
router.get('/:id', getReviewById);

// @route   GET /api/reviews/appointment/:id
// @desc    GET existing review by appointment id
// @access  Public
router.get('/appointment/:id', getReviewByAppointmentId);

// @route   GET /api/reviews/user/:id
// @desc    GET existing reviews by user id
// @access  Public
router.get('/user/:id', getReviewsByUserId);

// @route   DELETE /api/reviews/:id
// @desc    Delete current review
// @access  Private
router.delete('/:id', authMiddleware,  deleteReview);

// @route   PUT /api/reviews/:id
// @desc    Update current review
// @access  Private
router.put('/:id', authMiddleware, updateReview);
// router.put('/:id', updateReview);

// @route   GET /api/reviews/get-user/:id
// @desc    GET existing reviews by user id
// @access  Public
router.get('/get-user/:id', getUserByReviewId);

module.exports = router;