import React from "react";
import PropTypes from "prop-types";
import Container from "@/components/atoms/Container/Container.jsx";
import Header from "@/components/organisms/Header/Header.jsx";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import style from './style.module.scss';
import cn from 'classnames';

const Banner = ({title, bannerImg, children, fullHeight, className}) => {
    return (
        <Container bgImage={bannerImg} className={cn({[style.bannerWrapper] : fullHeight})}>
            <Header className={style.header}/>

            <section className={cn(style.banner, className)}>
                <Typography variant='heading' uppercase>
                    {title}
                </Typography>
                {children}
            </section>
        </Container>
    )
};

Banner.propTypes = {
    title: PropTypes.string,
    bannerImg: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any,
    fullHeight: PropTypes.bool,
}

export default Banner