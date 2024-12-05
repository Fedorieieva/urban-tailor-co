import React from "react";
import Banner from "@/components/organisms/Banner/Banner.jsx";
import Container from "@/components/atoms/Container/Container.jsx";
import CreatePortfolioForm from "@/components/molecules/CreatePortfolioForm/CreatePortfolioForm.jsx";
import ImageUpload from "@/components/molecules/ImageUpload/ImageUpload.jsx";
import Portfolio from "@/components/organisms/Portfolio/Portfolio.jsx";
import {useSelector} from "react-redux";
import {selectUser} from "@/store/selectors/index.js";
import {useFetchTailorPortfolio} from "@/hooks/handlePortfolio.js";
import style from './style.module.scss';

const TailorPortfolioPage = () => {
    const tailorId = useSelector(selectUser).id;
    const portfolio = useFetchTailorPortfolio(tailorId);

    return (
        <>
            <Banner title='Your Portfolio' bannerImg='../../public/images/appointments-banner.png'/>

            <Container dark>
                {!portfolio || Object.keys(portfolio).length === 0 ? (
                    <>
                        <ImageUpload className={style.upload}/>
                        <CreatePortfolioForm/>
                    </>
                ) : (
                    <Portfolio tailorId={tailorId} />
                )}
            </Container>
        </>
    )
};

export default TailorPortfolioPage