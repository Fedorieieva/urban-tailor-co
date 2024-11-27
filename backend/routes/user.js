const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
    loginUser,
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    updatePassword,
    getUsersByRole,
} = require('../controllers/users');
const router = express.Router();


// @route   POST /api/users/login
// @desc    Login user / Returning JWT Token
// @access  Public
router.post('/login', loginUser);

// @route   POST /api/users
// @desc    Register user
// @access  Public
router.post('/', createUser);

// @route   GET /api/users
// @desc    GET all existing users
// @access  Public
router.get('/', getAllUsers);

// @route   GET /api/users/role
// @desc    GET all existing users by role
// @access  Public
router.get('/role', getUsersByRole);

// @route   GET /api/users/:id
// @desc    GET existing user
// @access  Public
router.get('/:id', getUser);

// @route   PUT /api/users/:id
// @desc    Update current user
// @access  Private
router.put('/:id', authMiddleware, updateUser);

// @route   PUT /api/users/:id/update-password
// @desc    Update current user
// @access  Private
router.put('/:id/update-password', authMiddleware, updatePassword);

// @route   DELETE /api/users/:id
// @desc    Delete current user
// @access  Private
router.delete('/:id', authMiddleware,  deleteUser);
// router.delete('/:id',  deleteUser);

module.exports = router;