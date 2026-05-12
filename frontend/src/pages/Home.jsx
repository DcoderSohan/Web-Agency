import React from "react";
import Hero from "../components/Hero";
import Statement from "../components/Statement";
import FeaturedWork from "../components/FeaturedWork";
import CTA from "../components/CTA";

const Home = () => {
    return (
        <>
            <Hero />
            <Statement />
            <FeaturedWork />
            <CTA />
        </>
    );
};

export default Home;
