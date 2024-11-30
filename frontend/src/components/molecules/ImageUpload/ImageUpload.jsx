import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {actionSetProfileImageSrc, actionSetPostImageSrc} from "../../../store/reducers/uploadedImage.slice.js";
import PropTypes from "prop-types";

const ImageUpload = ({isProfile = false}) => {
    const dispatch = useDispatch();
    const postUrl = `https://api.cloudinary.com/v1_1/dotz9ajec/image/upload`;
    const [loading, setLoading] = useState(false);

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        setLoading(true);

        try {
            let imageUrls;

            if (isProfile && files.length > 0) {
                const formData = new FormData();
                formData.append("file", files[0]);
                formData.append("upload_preset", "wqox7fvv");

                const response = await fetch(postUrl, {
                    method: "POST",
                    body: formData,
                });
                const data = await response.json();
                imageUrls = data.secure_url;

                dispatch(actionSetProfileImageSrc(imageUrls));
                console.log("Uploaded profile image URL:", imageUrls);

            } else {
                const uploadPromises = files.map(async (file) => {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("upload_preset", "wqox7fvv");

                    const response = await fetch(postUrl, {
                        method: "POST",
                        body: formData,
                    });
                    const data = await response.json();
                    return data.secure_url;
                });

                imageUrls = await Promise.all(uploadPromises);

                dispatch(actionSetPostImageSrc(imageUrls));
                console.log("Uploaded post image URLs:", imageUrls);
            }
        } catch (error) {
            console.error("Error uploading the images", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="file"
                onChange={handleImageUpload}
                multiple={!isProfile}
            />
            {loading && (
                <p>Uploading...</p>
            )}
        </div>
    );
};

ImageUpload.propTypes = {
    isProfile: PropTypes.bool
}

export default ImageUpload;
