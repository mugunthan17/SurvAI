import React from "react";
import { Link } from "react-router-dom";
import FadeInSection from "./../Animations/FadeInSection.jsx";

const AboutSection = () => {
  return (
    <FadeInSection>
      <section id="about" className="py-36 px-6 text-center">
        <h3 className="text-3xl lg:text-4xl md:text-3xl alexa font-bold mb-6 text-[#0C0C0C]">
          About Surv<span className="text-[#2A3BFF]">AI</span>
        </h3>
        <p className="text-[#555555] text-lg pop max-w-6xl mx-auto text-center">
          At SurvAI, we believe surveys should lead to decisions—not overwhelm.
          That’s why we built an AI-first platform that turns raw survey
          responses into real insights & summarizes them in seconds with the
          help of AI. Whether you're a Product Manager, a HR leader, a Business
          Analyst, SurvAI is here to summarize survey responses faster, smarter
          & insightful.{" "}
          <Link
            to="/about-us"
            className="text-[#2A3BFF] hover:underline cursor-pointer transition-colors duration-200 font-medium"
          >
            Know More About SurvAI.
          </Link>
        </p>
      </section>
    </FadeInSection>
  );
};

export default AboutSection;
