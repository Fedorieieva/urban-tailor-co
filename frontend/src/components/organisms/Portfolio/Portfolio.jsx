import React, {useEffect, useState} from "react";
import {useFetchTailorPortfolio, useUpdatePortfolio} from "@/hooks/handlePortfolio.js";
import {useFetchUser} from "@/hooks/handleUser.js";
import {useSelector} from "react-redux";
import {selectIsLoadingImages, selectUploadedPostImages} from "@/store/selectors/uploadImage.selectors.js"; // selector to track image loading state
import style from './style.module.scss';
import RoundIcon from "@/components/atoms/RoundIcon/RoundIcon.jsx";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import Delete from '../../../../public/images/icons/delete.svg?react';
import Edit from '../../../../public/images/icons/edit.svg?react';
import Button from "@/components/atoms/Button/Button.jsx";
import EditTextArea from "@/components/molecules/EditTextArea/EditTextArea.jsx";
import ImageUpload from "@/components/molecules/ImageUpload/ImageUpload.jsx";

const Portfolio = ({tailorId}) => {
    const tailor = useFetchUser(tailorId);
    const portfolio = useFetchTailorPortfolio(tailorId);
    const {editPortfolio, isEditing: isUpdating} = useUpdatePortfolio();
    const isLoadingImages = useSelector(selectIsLoadingImages);
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState('');

    useEffect(() => {
        setDescription(portfolio.description);
    }, [portfolio]);

    useEffect(() => {
        if (!isLoadingImages && isEditing) {
            editPortfolio(portfolio.id, {description, imgUrls: portfolio.imgUrls});
        }
    }, [isLoadingImages]);

    if (!tailor || Object.keys(portfolio).length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className={style.actionBtns}>
                {isEditing && <ImageUpload/>}

                <Button variant="transparent" onClick={() => setIsEditing(!isEditing)}>
                    <Edit/>
                </Button>
                <Button variant="transparent">
                    <Delete/>
                </Button>
            </div>

            <section className={style.portfolioInfo}>
                <RoundIcon src={tailor.userAvatar}/>
                <Typography variant="text-2xl" uppercase className={style.username}>
                    {tailor.username}
                </Typography>

                <EditTextArea
                    content={description}
                    setContent={setDescription}
                    onClick={() => {
                        editPortfolio(portfolio.id, {description, imgUrls: portfolio.imgUrls});
                        setIsEditing(!isEditing);
                    }}
                    isEditing={isEditing}
                />
            </section>

            <div className={style.imgGallery}>
                {portfolio.imgUrls.map((item, idx) => (
                    <div className={style.imgWrapper} key={idx}>
                        <img
                            src={item}
                            alt={`Portfolio image ${idx + 1}`}
                            className={style.image}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Portfolio;
