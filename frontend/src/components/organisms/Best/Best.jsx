import React from "react";
import Container from "@/components/atoms/Container/Container.jsx";
import Money from '../../../../public/images/icons/money.svg?react';
import Jacket from '../../../../public/images/icons/jacket.svg?react';
import SewingMachine from '../../../../public/images/icons/sewing-machine.svg?react';
import BestItem from "@/components/organisms/Best/components/BestItem.jsx";
import style from './style.module.scss';

const Best = () => {
    const bgImg = '../../../../public/images/scissors.png';
    return (
        <Container bgImage={bgImg}>
            <section className={style.bestSection}>
                <BestItem title='Best Price' text='Best price nisl quam nestibulum drana elementum sceisue the onte.'>
                    <Money/>
                </BestItem>
                <BestItem title='Best Fabric' text='Best fabric nisl quam nestibulum drana odio elementum monte.'>
                    <Jacket/>
                </BestItem>
                <BestItem title='Best Tailors' text='Best tailors nisl quam nestibulum drana odio elementum sceisue the n.'>
                    <SewingMachine/>
                </BestItem>
            </section>
        </Container>
    )
};

export default Best