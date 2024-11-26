import React from "react";
import Container from "./Container.jsx";
import style from './style.module.scss';
import PropTypes from "prop-types";

const LightContainer = ({children}) => {
    return (
        <div className={style.light}>
            <Container>{children}</Container>
        </div>
    );
};

LightContainer.propTypes = {
    children: PropTypes.any,
}

export default LightContainer