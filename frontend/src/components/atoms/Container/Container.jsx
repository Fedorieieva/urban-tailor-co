import React from "react";
import PropTypes from "prop-types";
import cn from 'classnames';
import style from './style.module.scss';


const Container = ({children, className, light = false, dark = false, bgImage, mask = true}) => {
    const wrapperStyle = bgImage ? {backgroundImage: `url(${bgImage})`} : {};
    const containerStyle = mask ? {zIndex: 1} : {};

    return (
        <div className={cn(style.wrapper, {[style.light]: light},
            {[style.dark]: dark})}
             style={wrapperStyle}
        >
            {mask && <div className={style.mask}/>}
            <div className={cn(style.container, className)} style={containerStyle}>
                {children}
            </div>
        </div>

    );
};


Container.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    bgImage: PropTypes.string,
    light: PropTypes.bool,
    dark: PropTypes.bool,
}

export default Container