const User = require('../models/User.js');
const jwtUtils = require('../utils/jwt');
const bcrypt = require('bcryptjs');

exports.loginUser = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const user = await User.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const isValidPassword = await User.comparePassword(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({message: 'Invalid password'});
        }

        const token = `Bearer ${jwtUtils.generateToken(user)}`;

        res.json({token});
    } catch (error) {
        next(error);
    }
}

exports.createUser = async (req, res, next) => {
    try {
        const user = await User.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

exports.getUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await User.getUserById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await User.getUserById(id);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const userUpdate = await User.updateUser(id, req.body);
        res.json(userUpdate);
    } catch (error) {
        next(error);
    }
};

exports.updatePassword = async (req, res, next) => {
    const {currentPassword, newPassword} = req.body;
    const userId = req.params.id;

    try {
        const user = await User.getUserById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const isPasswordValid = await User.comparePassword(currentPassword, user.password);
        // const isPasswordValid = currentPassword === user.password;
        if (!isPasswordValid) {
            return res.status(401).json({message: 'Current password is incorrect'});
        }

        await User.updateUserPassword(userId, newPassword);

        res.status(200).json({message: 'Password updated successfully'});
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const user = await User.getUserById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        await User.deleteUser(userId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
};