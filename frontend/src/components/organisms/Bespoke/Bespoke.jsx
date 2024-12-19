import React from "react";
import About from "@/components/organisms/Bespoke/components/About.jsx";
import BespokeItem from "@/components/organisms/Bespoke/components/BespokeItem.jsx";

const Bespoke = () => {
    return (
        <section>
            <About/>
            <BespokeItem
                mainTitle='Unique Styles'
                secondaryTitle='style'
                img="/images/suits1.png"
                text='Lorem ipsum dolor sit amet consectetur. Lectus est
                      senectus lacus vulputate erat tempus aenean adipiscing.
                      Eu massa maecenas lorem massa quis fusce. Eget risus
                      vitae pretium ut egestas lorem in. Vitae placerat
                      elementum arcu nisi'
            />
            <BespokeItem
                reverse
                mainTitle='The Craftsman ship'
                secondaryTitle='Craft'
                img="/images/suits2.png"
                text='Lorem ipsum dolor sit amet consectetur. Lectus est
                      senectus lacus vulputate erat tempus aenean adipiscing.
                      Eu massa maecenas lorem massa quis fusce. Eget risus
                      vitae pretium ut egestas lorem in. Vitae placerat
                      elementum arcu nisi'
            />
        </section>
    );
};

export default Bespoke