import React from "react";
import LogoIcon from '../../../../public/images/icons/scissors.svg?react';
import Button from "@/components/atoms/Button/Button.jsx";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import PropTypes from "prop-types";

const Logo = ({className}) => {
    return <Button to='/' variant='transparent' className={className}>
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