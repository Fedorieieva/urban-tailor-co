import React from "react";
import Container from "@/components/atoms/Container/Container.jsx";
import style from "@/pages/style.module.scss";
import Header from "@/components/organisms/Header/Header.jsx";
import Search from "@/components/molecules/Search/Search.jsx";
import SectionTitle from "@/components/molecules/SectionTitle/SectionTitle.jsx";

const Tailors = () => {

    return (
        <div className={style.tailorsPage}>
            <Container bgImage='/images/thread.png'>
                <Header/>
                <SectionTitle
                    mainTitle='our masterpiese creators'
                    secondaryTitle='tailors'
                    className={style.tailorsTitle}
                />
            </Container>

            <Container dark className={style.searchWrapper}>
                <Search role='tailor' viewPortfolio/>
            </Container>
        </div>

    );
};

export default Tailors
