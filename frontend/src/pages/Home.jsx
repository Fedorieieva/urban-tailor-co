import React from "react";
import PostFeed from "../components/organisms/PostFeed/PostFeed.jsx";
import Search from "../components/molecules/Search/Search.jsx";
import Container from "../components/atoms/Container/Container.jsx";

const Home = () => {
    return (
        <Container>
            <Search/>
            <PostFeed/>
        </Container>

    );
};

export default Home;