const express = require("express");
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

const {
    deleteImageFromCloudinary
} = require("../controllers/cloudinary");

// @route   DELETE api/cloudinary/:id
// @desc    DELETE existing post
// @access  Private
router.delete("/", authMiddleware, deleteImageFromCloudinary);

module.exports = router;