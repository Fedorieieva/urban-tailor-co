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
    const {status} = req.body;

    try {
        const appointments = await Appointment.getAppointmentByStatus(status);

        return res.status(200).json(appointments);
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
    try {
        const appointments = await Appointment.getAllAppointments();
        res.json(appointments);
    } catch (error) {
        next(error);
    }
}

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

exports.getUserAppointments = async(req, res, next) => {
    const userId = req.params.id;

    try {
        const user = await User.getUserById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const appointments = await Appointment.getAppointmentsByUser(userId);
        res.json(appointments);
    } catch (error) {
        next(error);
    }
}

exports.getTailorAppointments = async(req, res, next) => {
    const userId = req.params.id;

    try {
        const user = await User.getUserById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const appointments = await Appointment.getAppointmentsByTailor(userId);
        res.json(appointments);
    } catch (error) {
        next(error);
    }
}