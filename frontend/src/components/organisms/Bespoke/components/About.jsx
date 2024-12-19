import React from "react";
import Container from "@/components/atoms/Container/Container.jsx";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import SectionTitle from "@/components/molecules/SectionTitle/SectionTitle.jsx";
import style from './style.module.scss';

const About = () => {
    return (
        <Container light>
            <SectionTitle
                fullWidth
                mainTitle='The Art of Bespoke Tailoring'
                secondaryTitle='about'
                className={style.title}
            />

            <div className={style.about}>
                <img src="/images/thread.png" alt="thread" className={style.img}/>
                <div className={style.textSection}>
                    <Typography variant='text-3xl' uppercase className={style.aboutTitle}>Discover True
                        Quality</Typography>
                    <Typography variant='text-2xl' className={style.infoText}>
                        Sed sapien neque lectus quis sit odio. Pulvinar donec a id a.
                        Libero purus proin ut egestas quis posuere. Mauris at amet
                        pellentesque tempor rhoncus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad dolor
                        et facere numquam quod repellat sapiente soluta veritatis! Nihil, omnis possimus? Magni minus
                        pariatur tempore.
                    </Typography>
                </div>
            </div>
        </Container>
    );
};

export default About