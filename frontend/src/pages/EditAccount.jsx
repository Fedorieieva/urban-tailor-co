import React from "react";
import EditUserInfo from "../components/molecules/EditUserInfo/EditUserInfo.jsx";
import Container from "../components/atoms/Container/Container.jsx";
import ImageUpload from "../components/molecules/ImageUpload/ImageUpload.jsx";
import style from './style.module.scss';
import Header from "@/components/organisms/Header/Header.jsx";
import SectionTitle from "@/components/molecules/SectionTitle/SectionTitle.jsx";
const EditAccount = () => {
    return (
        <Container dark className={style.editPageContainer}>
            <Header/>
            <section className={style.editAccountPage}>
                <SectionTitle mainTitle='Your profile settings' secondaryTitle='edit your profile' className={style.title}/>
                <ImageUpload isProfile={true}/>
                <EditUserInfo/>
            </section>
        </Container>
    );
};

export default EditAccount