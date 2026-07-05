import React from "react";
import Navbar from "./navbar";
import Hero from "./hero";
import HowItWorks from "./howItWorks";
import Features from "./features";
import GetStarted from "./getStarted";
import Pricing from "../pricing";
import CtaSection from "./ctaSection";
import Footer from "./footer";

function Homepage() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks/>
      <Features/>
      <GetStarted/>
      <Pricing />
      <CtaSection/>
      <Footer/>
    </>
  );
}

export default Homepage;
