import React from "react";
import Banner from "@/components/organisms/Banner/Banner.jsx";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import Button from "@/components/atoms/Button/Button.jsx";
import style from './style.module.scss';
import Bespoke from "@/components/organisms/Bespoke/Bespoke.jsx";
import Services from "@/components/organisms/Services/Services.jsx";
import Best from "@/components/organisms/Best/Best.jsx";
import Offer from "@/components/organisms/Offer/Offer.jsx";
import Gallery from "@/components/organisms/Gallery/Gallery.jsx";
import {useSelector} from "react-redux";
import {selectAuthUserToken} from "@/store/selectors/index.js";
import Reviews from "@/components/organisms/Reviews/Reviews.jsx";

const Home = () => {
    const userToken = useSelector(selectAuthUserToken);

    return (
        <>
            <Banner
                title='We Make Clothes That Suit You'
                bannerImg='/images/main-banner.png'
                fullHeight
            >
                <Typography variant='text-sm' className={style.text}>
                    Lorem ipsum dolor sit amet consec perdiet interdum est mattis purus
                    facilisis. Vitae elementum enim ipsum morbi lacus ipsum semper in elit.
                </Typography>

                <Button to={userToken ? '/appointments' : '/sign-in'}>
                    <Typography variant='text-xs' bold>Book an Appointment</Typography>
                </Button>
            </Banner>

            <Bespoke/>
            <Services/>
            <Best/>
            <Offer/>
            <Gallery/>
            <Reviews/>
        </>

    );
};

export default Home;