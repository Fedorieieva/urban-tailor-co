import React from "react";
import Facebook from '../../../../public/images/icons/facebook.svg?react';
import Twitter from '../../../../public/images/icons/twitter.svg?react';
import Youtube from '../../../../public/images/icons/youtube.svg?react';
import Linkedin from '../../../../public/images/icons/linkedin.svg?react';
import Instagram from '../../../../public/images/icons/instagram.svg?react';
import style from './style.module.scss';
import PropTypes from "prop-types";
import cn from 'classnames';

const SocialMedia = ({className}) => {
    return (
        <ul className={cn(style.media, className)}>
            <li className={style.listElement}>
                <Facebook/>
            </li>
            <li className={style.listElement}>
                <Twitter/>
            </li>
            <li className={style.listElement}>
                <Youtube/>
            </li>
            <li className={style.listElement}>
                <Linkedin/>
            </li>
            <li className={style.listElement}>
                <Instagram/>
            </li>
        </ul>
    );
};

SocialMedia.propType = {
    className: PropTypes.string
}

export default SocialMedia;