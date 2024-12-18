import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {
    useFetchTailorPortfolio,
    useUpdatePortfolio,
    fetchPortfolioById
} from "@/hooks/handlePortfolio.js";
import {useFetchUser} from "@/hooks/handleUser.js";
import {useSelector} from "react-redux";
import {selectIsLoadingImages} from "@/store/selectors/uploadImage.selectors.js";
import style from './style.module.scss';
import RoundIcon from "@/components/atoms/RoundIcon/RoundIcon.jsx";

import Delete from '../../../../public/images/icons/delete.svg?react';
import Edit from '../../../../public/images/icons/edit.svg?react';
import Button from "@/components/atoms/Button/Button.jsx";
import EditTextArea from "@/components/molecules/EditTextArea/EditTextArea.jsx";
import ImageUpload from "@/components/molecules/ImageUpload/ImageUpload.jsx";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import {useDeleteImgFromCloudinary} from "@/hooks/handleCloudinary.js";
import {selectAuthUserToken, selectUser} from "@/store/selectors/index.js";

const Portfolio = ({tailorId}) => {
    const userToken = useSelector(selectAuthUserToken);
    const currentUser = useSelector(selectUser).id;
    const tailor = useFetchUser(tailorId);
    const initialPortfolio = useFetchTailorPortfolio(tailorId);
    const [portfolio, setPortfolio] = useState(initialPortfolio || {});

    useEffect(() => {
        setPortfolio(initialPortfolio);
    }, [initialPortfolio]);

    const {editPortfolio, isEditing: isUpdating} = useUpdatePortfolio();
    const isLoadingImages = useSelector(selectIsLoadingImages);
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (portfolio) {
            setDescription(portfolio.description || '');
        }
    }, [portfolio]);

    const handleEditCompletion = async () => {
        try {
            await editPortfolio(portfolio.id, {description, imgUrls: portfolio.imgUrls});

            const updatedPortfolio = await fetchPortfolioById(portfolio.id);
            setPortfolio(updatedPortfolio);

            setIsEditing(false);
            console.log("Portfolio updated successfully.");
        } catch (error) {
            console.error("Failed to update portfolio:", error);
        }
    };

    const handleDeleteImage = async (imageUrl) => {
        try {
            await useDeleteImgFromCloudinary(imageUrl, userToken);
            const updatedImgUrls = portfolio.imgUrls.filter((url) => url !== imageUrl);
            await editPortfolio(portfolio.id, {description, imgUrls: updatedImgUrls});

            const updatedPortfolio = await fetchPortfolioById(portfolio.id);
            setPortfolio(updatedPortfolio);

            console.log("Image deleted successfully.");
        } catch (error) {
            console.error("Failed to delete image:", error);
        }
    };

    useEffect(() => {
        if (!isLoadingImages && isEditing) {
            handleEditCompletion();
        }
    }, [isLoadingImages]);

    if (!tailor || !portfolio || Object.keys(portfolio).length === 0) {
        return <Typography variant='text-xl' capitalize>
            we are sorry, the tailor didn't fill out his portfolio yet
        </Typography>;
    }

    return (
        <div>
            {currentUser === portfolio.tailorId && (
                <div className={style.actionBtns}>
                    {isEditing && <ImageUpload onUploadComplete={handleEditCompletion}/>}

                    <Button
                        variant="transparent"
                        onClick={() => setIsEditing(!isEditing)}
                        aria-label={isEditing ? "Cancel Editing" : "Edit Portfolio"}
                    >
                        <Edit/>
                    </Button>
                    <Button variant="transparent" aria-label="Delete Portfolio">
                        <Delete/>
                    </Button>
                </div>
            )}

            <section className={style.portfolioInfo}>
                <RoundIcon src={tailor.userAvatar} alt={`${tailor.username}'s avatar`}/>
                <Typography variant="text-2xl" uppercase className={style.username}>
                    {tailor.username}
                </Typography>

                <EditTextArea
                    content={description}
                    setContent={setDescription}
                    onClick={handleEditCompletion}
                    isEditing={isEditing}
                />
            </section>

            <div className={style.imgGallery}>
                {portfolio.imgUrls.map((item, idx) => (
                    <div className={style.imgWrapper} key={idx}>
                        {isEditing && (
                            <Button
                                variant="transparent"
                                className={style.deleteImg}
                                onClick={() => handleDeleteImage(item)}
                                aria-label={`Delete image ${idx + 1}`}
                            >
                                <Delete/>
                            </Button>
                        )}
                        <img
                            src={item}
                            alt={`Portfolio item ${idx + 1}`}
                            className={style.image}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

Portfolio.propTypes = {
    tailorId: PropTypes.string,
}

export default Portfolio;
