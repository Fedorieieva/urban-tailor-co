import React from "react";
import PropTypes from "prop-types";
import RoundIcon from "@/components/atoms/RoundIcon/RoundIcon.jsx";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import style from './style.module.scss';

const ServicesItem = ({icon, title, description}) => {
    return (
        <div className={style.item}>
            <RoundIcon src={icon}/>
            <Typography variant='text-xl' uppercase>{title}</Typography>
            <Typography variant='text-sm'>{description}</Typography>
        </div>
    );
};

ServicesItem.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
}

export default ServicesItem