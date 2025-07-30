import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserAuthForm from './../LinkedInAuth/UserAuthForm.jsx';
import FadeInSection from './../Animations/FadeInSection.jsx';

const HeroSection = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();

  const handleGetStartedClick = () => {
    const linkedInId = localStorage.getItem("survai_linkedin_id");
    if (linkedInId) {
      navigate("/feature");
    } else {
      setShowAuthModal(true);
    }
  };

  const handleAuthSubmit = (id) => {
    setShowAuthModal(false);
    navigate("/feature");
  };

  return (
    <FadeInSection>
      <section className="text-center flex flex-col items-center justify-center py-30">
        <h2 className="pt-4 text-3xl lg:text-5xl md:text-3xl text-[#0C0C0C] alexa w-[80%] lg:w-[80%] md:w-[80%] font-semibold leading-snug">
          Get Summary of your Survey Responses <br /> in Seconds with{" "}
          <span className="text-[#2A3BFF]">AI</span>
        </h2>
        <p className="text-base lg:text-xl md:text-xl text-[#555555] mt-4 px-10 lg:px-70 md:px-10 pop font-medium">
          SurvAI turns survey responses into clear insights—instantly. From quick
          summaries to deep analytics, see what people really think.
        </p>
        <button
          onClick={handleGetStartedClick}
          className="mt-6 px-6 md:px-8 lg:px-8 py-3 md:py-4 lg:py-4 bg-[#2A3BFF] text-[#EEEEEE] pop text-base lg:text-xl md:text-xl rounded-4xl font-medium flex items-center gap-2 cursor-pointer transition-shadow hover:shadow-[0_0_12px_#2A3BFF]"
        >
          Get Started Now
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M16 8.4L7.1 17.3a.984.984 0 0 1-1.4 0 .984.984 0 0 1 0-1.4L14.6 7H7a1 1 0 0 1 0-2h10a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V8.4z" />
          </svg>
        </button>
        {showAuthModal && (
          <UserAuthForm
            onClose={() => setShowAuthModal(false)}
            onAuthenticated={handleAuthSubmit}
          />
        )}
      </section>
    </FadeInSection>
  );
};

export default HeroSection;
