import React from "react";
import PropTypes from "prop-types";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import style from './style.module.scss';

const SectionTitle = ({mainTitle, secondaryTitle, fullWidth = false, className}) => {
    return (
        <div className={className}>
            <Typography
                fullWidth={fullWidth}
                goldUnderline
                uppercase
                bold
                variant='text-xs'
                className={style.secondaryTitle}
            >
                {secondaryTitle}
            </Typography>
            <Typography
                uppercase
                variant='text-4xl'
            >
                {mainTitle}
            </Typography>
        </div>
    )
};

SectionTitle.propTypes = {
    mainTitle: PropTypes.string,
    secondaryTitle: PropTypes.string,
    className: PropTypes.string,
    fullWidth: PropTypes.bool,
}

export default SectionTitle