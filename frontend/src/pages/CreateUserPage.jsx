import React from "react";
import Banner from "@/components/organisms/Banner/Banner.jsx";
import CreateUser from "@/components/molecules/CreateUser/CreateUser.jsx";

const CreateUserPage = () => {
    return (
        <Banner
            title='Create new user for your needs'
            bannerImg="/images/ceate_user.png"
            fullHeight
        >
            <CreateUser/>
        </Banner>
    );
};

export default CreateUserPage;