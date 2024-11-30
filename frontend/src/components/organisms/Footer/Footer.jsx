import React from "react";
import style from './style.module.scss';
import Logo from "@/components/molecules/Logo/Logo.jsx";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import SocialMedia from "@/components/molecules/SocialMedia/SocialMedia.jsx";
import Container from "@/components/atoms/Container/Container.jsx";

const Footer = () => {
    const footerBg = '../../../../public/images/footer-bg.png';

    return (
        <Container bgImage={footerBg}>
            <footer className={style.footer}>
                <div className={style.info}>
                    <div className={style.corporationInfo}>
                        <Logo className={style.logo}/>
                        <Typography variant='text-2xl' uppercase>Stay In Touch</Typography>
                    </div>

                    <div className={style.location}>
                        <Typography variant='text-xs' colored uppercase>Address</Typography>
                        <Typography variant='text-sm'>768 Tailor Street London,
                            CA 64015, Britain</Typography>
                        <Typography variant='text-xxs' bold uppercase>urbantc@gmail.com</Typography>
                        <Typography variant='text-sm'>021-3456-789</Typography>
                    </div>

                    <SocialMedia className={style.media}/>
                </div>

                <div className={style.ownership}>
                    <Typography variant='text-sm' bold>&#169; 2024 Urban Tailor Co</Typography>
                    <Typography variant='text-sm'>All rights reserved</Typography>
                    <Typography variant='text-sm'>by @Fedorieieva</Typography>
                </div>
            </footer>
        </Container>
    );
};

export default Footer