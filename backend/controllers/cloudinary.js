const cloudinary = require('cloudinary').v2;
const express = require('express');

cloudinary.config({
    cloud_name: 'dotz9ajec',  // Replace with your Cloudinary Cloud Name
    api_key: '739998445736963',       // Replace with your Cloudinary API Key
    api_secret: 'JZKARJUEFuUKVJeaKBiPRNpIp8Q', // Replace with your Cloudinary API Secret
});

// Define the route and controller function properly
exports.deleteImageFromCloudinary = async (req, res, next) => {
    const {publicId} = req.body;

    try {
        const result = await cloudinary.uploader.destroy(publicId);
        res.status(200).json({message: 'Image deleted successfully', result});
    } catch (error) {
        res.status(500).json({error: 'Failed to delete image', details: error.message});
    }
};
