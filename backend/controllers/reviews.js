const Review = require('../models/Review');
const Appointment = require('../models/Appointment');
const User = require("../models/User");

exports.createReview = async (req, res, next) => {
    const {appointmentId} = req.body;

    try {
        const appointment = await Appointment.getAppointmentById(appointmentId);
        if (!appointment) {
            res.status(404).json({message: 'Appointment not found'});
        }

        const existingReview = await Review.reviewExists(appointmentId);
        if (existingReview) {
            return res.status(400).json({message: 'Review already exists for this appointment'});
        }

        const review = await Review.createReview(req.body);

        res.status(201).json(review);
    } catch (error) {
        next(error);
    }
};

exports.updateReview = async (req, res, next) => {
    const reviewId = req.params.id;

    try {
        const review = await Review.getReviewById(reviewId);
        if (!review) {
            return res.status(404).json({message: 'Review not found'});
        }

        const updatedReview = await Review.updateReview(reviewId, req.body);

        res.status(200).json(updatedReview);
    } catch (error) {
        next(error);
    }
};

exports.deleteReview = async (req, res, next) => {
    const reviewId = req.params.id;

    try {
        const review = await Review.getReviewById(reviewId);
        if (!review) {
            return res.status(404).json({message: 'Review not found'});
        }

        await Review.deleteReview(reviewId);

        res.status(200).json({message: 'Review deleted successfully'});
    } catch (error) {
        next(error);
    }
};

exports.getReviewByAppointmentId = async (req, res, next) => {
    const appointmentId = req.params.id;

    try {
        const appointment = await Appointment.getAppointmentById(appointmentId);
        if (!appointment) {
            res.status(404).json({message: 'Appointment not found'});
        }

        const review = await Review.getReviewByAppointmentId(appointmentId);
        if (!review) {
            return res.status(204).json({});
        }

        res.status(200).json(review);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.getReviewById = async (req, res, next) => {
    const reviewId = req.params.id;

    try {
        const review = await Review.getReviewById(reviewId);
        if (!review) {
            return res.status(404).json({message: 'Review not found'});
        }

        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
};

exports.getAllReviews = async (req, res, next) => {
    const {page = 1, limit = 10} = req.query;

    try {
        const {total, reviews} = await Review.getAllReviews(Number(page), Number(limit));

        res.status(200).json({total, reviews});
    } catch (error) {
        next(error);
    }
};

exports.getReviewsByUserId = async (req, res, next) => {
    const userId = req.params.id;
    const {page = 1, limit = 10} = req.query;

    try {
        const user = await User.getUserById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const {total, reviews} = await Review.getUserReviews(userId, Number(page), Number(limit));
        if (reviews.length === 0) {
            return res.status(404).json({message: 'No reviews found for the given user ID'});
        }

        res.status(200).json({total, reviews});
    } catch (error) {
        next(error);
    }
};

exports.getUserByReviewId = async (req, res, next) => {
    const reviewId = req.params.id;

    try {
        const review = await Review.getReviewById(reviewId);
        if (!review) {
            return res.status(404).json({message: 'Review not found'});
        }

        const user = await Review.getUserByReviewId(reviewId);

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};