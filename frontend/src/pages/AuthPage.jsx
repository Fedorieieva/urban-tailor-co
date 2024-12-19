import React from "react";
import Auth from "../components/organisms/Auth/Auth.jsx";
import Header from "@/components/organisms/Header/Header.jsx";
import Container from "@/components/atoms/Container/Container.jsx";
import style from './style.module.scss';

const AuthPage = () => {
    return (
        <Container light className={style.logInContainer}>
            <Header className={style.header}/>
            <section className={style.logInSection}>
                <img src="/images/friends.png" alt="frends"/>
                <Auth/>
            </section>
        </Container>
    );
};

export default AuthPage