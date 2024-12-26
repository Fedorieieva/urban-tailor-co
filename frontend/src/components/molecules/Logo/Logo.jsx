import React from "react";
import LogoIcon from '../../../../public/images/icons/scissors.svg?react';
import Button from "@/components/atoms/Button/Button.jsx";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

const Logo = ({className}) => {
    const navigate = useNavigate();

    return <Button variant='transparent' className={className} onClick={() => navigate('/')}>
        <LogoIcon/>
        <Typography
            variant='text-xl'
        >
            Urban Tailor Co.
        </Typography>
    </Button>
};

Logo.propTypes = {
    className: PropTypes.string
}

export default Logo