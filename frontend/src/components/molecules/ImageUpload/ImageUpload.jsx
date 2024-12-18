import React from 'react';
import PropTypes from "prop-types";
import {useImageUpload} from "@/hooks/handleCloudinary.js";
import Button from "../../atoms/Button/Button.jsx";
import {useSelector} from "react-redux";
import {selectIsLoadingImages} from "@/store/selectors/uploadImage.selectors.js";
import Typography from "@/shared/ui/Typography/Tupography.jsx";

const ImageUpload = ({isProfile = false, className}) => {
    const {handleImageUpload} = useImageUpload();
    const isLoadingImages = useSelector(selectIsLoadingImages);

    const onChange = async (e) => {
        const files = Array.from(e.target.files);
        try {
            await handleImageUpload(files, isProfile);
        } catch (error) {
            console.error("Image upload failed", error);
        }
    };

    return (
        <div className={className}>
            <input
                type="file"
                onChange={onChange}
                multiple={!isProfile}
                id="file-upload"
                accept="image/*"
                style={{display: 'none'}}
            />
            <Button>
                <label htmlFor="file-upload">
                    {isProfile ? "Choose Profile Image" : "Choose Images"}
                </label>
            </Button>

            {isLoadingImages && <Typography variant='text-xxs'>Uploading...</Typography>}
        </div>
    );
};

ImageUpload.propTypes = {
    isProfile: PropTypes.bool,
    className: PropTypes.string
}

export default ImageUpload;
