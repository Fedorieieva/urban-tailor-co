import React from "react";
import PropTypes from "prop-types";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import style from './style.module.scss';

const OfferCard = ({children, title}) => {
    return (
        <div className={style.card}>
            {children}
            <Typography variant='text-md' mediumBold>{title}</Typography>
        </div>
    );
};

OfferCard.propTypes = {
    children: PropTypes.any,
    title: PropTypes.string,
};

export default OfferCard