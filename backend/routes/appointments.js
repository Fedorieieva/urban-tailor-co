const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
    createAppointment,
    getAppointment,
    getAllAppointments,
    getAppointmentsByStatus,
    updateAppointmentStatus,
    deleteAppointment,
    assignAppointmentToTailor,
    getUserAppointments,
    getTailorAppointments,
} = require('../controllers/appointments');
const router = express.Router();


// @route   POST /api/appointments
// @desc    Create appointment
// @access  Private
router.post('/', authMiddleware, createAppointment);

// @route   GET /api/appointments
// @desc    GET all existing appointments
// @access  Public
router.get('/', getAllAppointments);

// @route   GET /api/appointments/status
// @desc    GET all existing appointments by status
// @access  Public
router.get('/status', getAppointmentsByStatus);

// @route   GET /api/appointments/:id
// @desc    GET existing appointment
// @access  Public
router.get('/:id', getAppointment);

// @route   GET /api/appointments/user/:id
// @desc    GET existing user appointments
// @access  Public
router.get('/user/:id', getUserAppointments);

// @route   GET /api/appointments/tailor/:id
// @desc    GET existing tailor appointments
// @access  Public
router.get('/tailor/:id', getTailorAppointments);

// @route   PUT /api/appointments/:id
// @desc    Update current appointment
// @access  Private
router.put('/:id', authMiddleware, updateAppointmentStatus);

// @route   DELETE /api/appointments/:id
// @desc    Delete current appointment
// @access  Private
router.delete('/:id', authMiddleware,  deleteAppointment);

// @route   PUT /api/appointments/:id/tailor
// @desc    Update current appointment
// @access  Private
router.put('/:id/tailor', authMiddleware, assignAppointmentToTailor);

module.exports = router;