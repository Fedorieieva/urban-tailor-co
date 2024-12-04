const Appointment = require('../models/Appointment');
const User = require("../models/User");

exports.createAppointment = async (req, res, next) => {
    const {customerId} = req.body;

    try {
        const user = await User.getUserById(customerId);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const appointment = Appointment.createAppointment(req.body);
        res.json(appointment);
    } catch (error) {
        next(error);
    }
}

exports.getAppointmentsByStatus = async (req, res, next) => {
    const {status, page = 1, limit = 10, sortBy} = req.query;

    try {
        const {total, appointments} = await Appointment.getAppointmentByStatus(
            status,
            Number(page),
            Number(limit),
            sortBy
        );

        res.json({total, appointments});
    } catch (error) {
        next(error);
    }
};

exports.getAppointment = async (req, res, next) => {
    const id = req.params.id;

    try {
        const appointment = await Appointment.getAppointmentById(id);
        if (!appointment) {
            res.status(404).json({message: 'Appointment not found'});
        }

        res.json(appointment);
    } catch (error) {
        next(error);
    }
}

exports.getAllAppointments = async (req, res, next) => {
    const {page = 1, limit = 10} = req.query;

    try {
        const {total, appointments} = await Appointment.getAllAppointments(Number(page), Number(limit));
        res.json({total, appointments});
    } catch (error) {
        next(error);
    }
};

exports.updateAppointmentStatus = async (req, res, next) => {
    const appointmentId = req.params.id;
    const {status} = req.body;

    try {
        const appointment = await Appointment.getAppointmentById(appointmentId);
        if (!appointment) {
            res.status(404).json({message: 'Appointment not found'});
        }

        const appointmentUpdate = await Appointment.updateAppointmentStatus(appointmentId, status);
        res.json(appointmentUpdate);
    } catch (error) {
        next(error);
    }
}

exports.deleteAppointment = async (req, res, next) => {
    const id = req.params.id;

    try {
        const appointment = await Appointment.getAppointmentById(id);
        if (!appointment) {
            res.status(404).json({message: 'Appointment not found'});
        }

        await Appointment.deleteAppointment(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

exports.assignAppointmentToTailor = async (req, res, next) => {
    const appointmentId = req.params.id;
    const {tailorId} = req.body;

    try {
        const user = await User.getUserById(tailorId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const appointment = await Appointment.getAppointmentById(appointmentId);
        if (!appointment) {
            res.status(404).json({message: 'Appointment not found'});
        }

        const assignedAppointment = await Appointment.assignAppointment(tailorId, appointmentId);
        res.json(assignedAppointment);
    } catch (error) {
        next(error);
    }
}

exports.getUserAppointments = async (req, res, next) => {
    const userId = req.params.id;
    const {page = 1, limit = 10, sortBy} = req.query;

    try {
        const user = await User.getUserById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const {total, appointments} = await Appointment.getAppointmentsByUser(
            userId,
            Number(page),
            Number(limit),
            sortBy
        );

        res.json({total, appointments});
    } catch (error) {
        next(error);
    }
};

exports.getTailorAppointments = async (req, res, next) => {
    const userId = req.params.id;
    const {page = 1, limit = 10, sortBy} = req.query;

    try {
        const user = await User.getUserById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const {total, appointments} = await Appointment.getAppointmentsByTailor(
            userId,
            Number(page),
            Number(limit),
            sortBy
        );

        res.json({total, appointments});
    } catch (error) {
        next(error);
    }
};