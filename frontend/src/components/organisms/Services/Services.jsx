import React from "react";
import Container from "@/components/atoms/Container/Container.jsx";
import SectionTitle from "@/components/molecules/SectionTitle/SectionTitle.jsx";
import style from './style.module.scss';
import ServicesItem from "@/components/organisms/Services/components/ServicesItem.jsx";

const Services = () => {
    return (
        <Container light>
            <section>
                <SectionTitle
                    mainTitle='Our Special Services'
                    secondaryTitle='services'
                    fullWidth
                    className={style.title}
                />

                <div className={style.servicesWrapper}>
                    <ServicesItem
                        title='Custom Accessories'
                        description='We have a wide range of bow ties which fit everyday fashion as well as special occasions'
                        icon='/images/services1.png'
                    />
                    <ServicesItem
                        title='Custom Tailoring'
                        description='You can choose all details you want, from buttons to pockets and lapels, we can do everything.'
                        icon='/images/services2.png'
                    />
                    <ServicesItem
                        title='Suit Resizing'
                        description='Each our suit is made to your exact measurements and fit your specific body type'
                        icon='/images/services3.png'
                    />
                    <ServicesItem
                        title='Wedding Services'
                        description='You and your groomsmen deserve the sharpest suits. Let us help you create suits for your day.'
                        icon='/images/services4.png'
                    />
                </div>
            </section>
        </Container>

    );
};

export default Services