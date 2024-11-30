import React from "react";
import PropTypes from "prop-types";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import style from './style.module.scss';

const BestItem = ({children, title, text}) => {
    return (
        <div className={style.item}>
            {children}
            <div>
                <Typography variant='text-xl' mediumBold className={style.title}>{title}</Typography>
                <Typography variant='text-sm' className={style.text}>{text}</Typography>
            </div>
        </div>
    )
};

BestItem.propTypes = {
    children: PropTypes.any,
    title: PropTypes.string,
    text: PropTypes.string
}

export default BestItem