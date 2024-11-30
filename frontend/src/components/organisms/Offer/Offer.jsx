import React from "react";
import Container from "@/components/atoms/Container/Container.jsx";
import SectionTitle from "@/components/molecules/SectionTitle/SectionTitle.jsx";
import OfferCard from "@/components/organisms/Offer/components/OfferCard.jsx";
import Jacket from '../../../../public/images/icons/jacket.svg?react';
import Dress from '../../../../public/images/icons/dress.svg?react';
import DesignerAlterations from '../../../../public/images/icons/designer-alterations.svg?react';
import WomenJacket from '../../../../public/images/icons/women-jacket.svg?react';
import SewingMachine from '../../../../public/images/icons/sewing-machine.svg?react';
import Scissors from '../../../../public/images/icons/scissors.svg?react';
import style from './style.module.scss';

const Offer = () => {
    return (
        <Container light>
            <section>
                <SectionTitle mainTitle='We Also Offer' className={style.title}/>

                <div className={style.offerWrapper}>
                    <OfferCard title='Jacket Alterations'>
                        <Jacket/>
                    </OfferCard>

                    <OfferCard title='Designer Alterations'>
                        <DesignerAlterations/>
                    </OfferCard>

                    <OfferCard title='Bridal Alterations'>
                        <Dress/>
                    </OfferCard>

                    <OfferCard title='Wear & Gown Alterations'>
                        <WomenJacket/>
                    </OfferCard>

                    <OfferCard title='Dress Alterations'>
                        <SewingMachine/>
                    </OfferCard>

                    <OfferCard title='Dress Repair'>
                        <Scissors/>
                    </OfferCard>
                </div>
            </section>
        </Container>
    );
};

export default Offer