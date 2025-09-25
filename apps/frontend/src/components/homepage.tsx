import React from "react";
import Navbar from "./navbar";
import Hero from "./hero";
import HowItWorks from "./howItWorks";
import Features from "./features";
import GetStarted from "./getStarted";
import CtaSection from "./ctaSection";

function Homepage() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks/>
      <Features/>
      <GetStarted/>
      <CtaSection/>
    </>
  );
}

export default Homepage;
