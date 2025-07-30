import React from "react";
import AboutHeroImg from "./../../assets/reqImgs/AboutHeroImg.png";
import FadeInSection from "./../Animations/FadeInSection.jsx";

function AboutUsHero() {
  return (
    <div className="mt-10 lg:mt-20 items-center">
      {/* Hero Section */}
      <FadeInSection>
        <div className="max-w-6xl flex px-5 md:px-4 lg:px-0 mx-auto mt-12 mb-12 flex-col text-center items-center justify-center">
          <h1 className="alexa text-[#2A3BFD] text-lg md:text-xl lg:text-xl font-normal">
            About Us
          </h1>
          <h1 className="alexa text-[#0C0C0C] px-5 md:px-5 lg:px-0 text-xl md:text-3xl lg:text-4xl font-medium mt-1">
            Unlock the Voice Behind Every Survey
          </h1>
          <img src={AboutHeroImg} className="mt-4 h-[10]" />
        </div>
      </FadeInSection>
    </div>
  );
}

export default AboutUsHero;
