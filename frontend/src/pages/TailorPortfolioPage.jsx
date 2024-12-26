import React, {useState} from "react";
import Banner from "@/components/organisms/Banner/Banner.jsx";
import Container from "@/components/atoms/Container/Container.jsx";
import CreatePortfolioForm from "@/components/molecules/CreatePortfolioForm/CreatePortfolioForm.jsx";
import ImageUpload from "@/components/molecules/ImageUpload/ImageUpload.jsx";
import Portfolio from "@/components/organisms/Portfolio/Portfolio.jsx";
import {useSelector} from "react-redux";
import {selectUser} from "@/store/selectors/index.js";
import {useFetchTailorPortfolio} from "@/hooks/handlePortfolio.js";
import style from './style.module.scss';
import Typography from "@/shared/ui/Typography/Tupography.jsx";

const TailorPortfolioPage = () => {
    const tailorId = useSelector(selectUser).id;
    const [triggerRerender, setTriggerRerender] = useState(false);
    // const portfolio = useFetchTailorPortfolio(tailorId);
    const portfolio = useFetchTailorPortfolio(tailorId, triggerRerender);

    // Callback to toggle the state
    const handleFormSubmitSuccess = () => {
        setTriggerRerender((prev) => !prev);
        console.log(triggerRerender)
    };

    return (
        <>
            <Banner title='Your Portfolio' bannerImg='/images/appointments-banner.png'/>

            <Container dark>
                {!portfolio || Object.keys(portfolio).length === 0 ? (
                    <>
                        <ImageUpload className={style.upload}/>
                        <CreatePortfolioForm onSuccess={handleFormSubmitSuccess}/>
                    </>
                ) : (
                    <Portfolio tailorId={tailorId} portfolioProp={portfolio}/>
                )}
            </Container>
        </>
    )
};

export default TailorPortfolioPage