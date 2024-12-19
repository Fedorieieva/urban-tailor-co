import React from "react";
import Container from "@/components/atoms/Container/Container.jsx";
import SectionTitle from "@/components/molecules/SectionTitle/SectionTitle.jsx";
import style from './style.module.scss';

const Gallery = () => {
    return (
        <Container dark>
            <section>
                <SectionTitle
                    mainTitle='View Our masterpieces'
                    secondaryTitle='gallery'
                    fullWidth
                    className={style.title}
                />

                <div className={style.gallery}>
                    <img src="/images/gallery4.png" alt="img"/>
                    <img src="/images/gallery3.png" alt="img"/>
                    <img src="/images/gallery5.png" alt="img"/>
                    <img src="/images/gallery1.png" alt="img"/>
                    <img src="/images/gallery6.png" alt="img"/>
                    <img src="/images/gallery2.png" alt="img"/>
                </div>
            </section>
        </Container>
    );
};

export default Gallery