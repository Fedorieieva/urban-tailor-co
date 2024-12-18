import React from "react";
import Container from "@/components/atoms/Container/Container.jsx";
import Button from "@/components/atoms/Button/Button.jsx";
import style from './style.module.scss';
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import Header from "@/components/organisms/Header/Header.jsx";

const NotFound = () => {

    return (
        <Container dark className={style.notFound}>
            <Header/>
            <div className={style.notFoundInfo}>
                <Typography variant='heading'>404</Typography>
                <Typography variant='text-xl' underline>Oops! The page you're looking for doesn't exist.</Typography>
                <Button to="/" >
                    <Typography variant="text-xs" bold>Go to home</Typography>
                </Button>
            </div>

        </Container>
    );
};

export default NotFound