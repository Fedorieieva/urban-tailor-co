import React from "react";
import PropTypes from "prop-types";
import style from './style.module.scss';
import SectionTitle from "@/components/molecules/SectionTitle/SectionTitle.jsx";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import cn from 'classnames';
import Container from "@/components/atoms/Container/Container.jsx";

const BespokeItem = ({mainTitle, secondaryTitle, text, reverse, img}) => {
    return (
        <Container dark>
            <div className={cn(style.bespokeItem, {[style.reverse]: reverse})}>
                <img src={img} alt="img"/>

                <div className={style.textWrapper}>
                    <SectionTitle mainTitle={mainTitle} secondaryTitle={secondaryTitle}/>

                    <Typography variant='text-sm'>{text}</Typography>
                </div>
            </div>
        </Container>

    );
};

BespokeItem.propTypes = {
    mainTitle: PropTypes.string,
    secondaryTitle: PropTypes.string,
    text: PropTypes.string,
    img: PropTypes.string,
    reverse: PropTypes.bool,
}

export default BespokeItem