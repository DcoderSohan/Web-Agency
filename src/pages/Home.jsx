import React from "react";
import Hero from "../components/Hero";
import AboutSection from "../components/About";
import Tech from "../components/Tech";
import Procedure from "../components/Procedure";
import Clients from "../components/Clients";

const Home = () => {
    return (
        <>
            <Hero />
            {/* <AboutSection /> */}
            <Tech />
            <Procedure />
            <Clients />
        </>
    );
};

export default Home;
