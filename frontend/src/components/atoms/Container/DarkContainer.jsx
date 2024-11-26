import React from "react";
import Container from "./Container.jsx";
import style from './style.module.scss';
import PropTypes from "prop-types";

const DarkContainer = ({children}) => {
    return (
        <div className={style.dark}>
            <Container>{children}</Container>
        </div>
    );
};

DarkContainer.propTypes = {
    children: PropTypes.any,
}

export default DarkContainer