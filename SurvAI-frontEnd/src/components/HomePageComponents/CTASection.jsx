import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SurvAITextImage from "./../../assets/reqImgs/BannerBG.png";
import FadeInSection from "./../Animations/FadeInSection.jsx";
import UserAuthForm from './../LinkedInAuth/UserAuthForm.jsx';

const CTASection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

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

  // Optional: Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showAuthModal ? "hidden" : "auto";
  }, [showAuthModal]);

  return (
    <>
      <FadeInSection>
        <section className="mb-24 lg:32 relative items-center text-center overflow-hidden text-[#EEEEEE] py-10 md:py-15 rounded-3xl mx-4 md:mx-auto max-w-6xl shadow-xl bg-gradient-to-r from-[#2A3BFF] to-[#2A3BFF] transition-all duration-100 ease-in-out">
          {/* SurvAI Background Image */}
          <img
            src={SurvAITextImage}
            alt="SurvAI Background"
            className={`absolute object-contain z-1 transition-all duration-700 ease-in-out
            w-[100%] max-w-none bottom-[-5%] left-1/2 transform -translate-x-1/2
            md:bottom-[-30%] md:w-[100%]
            lg:top-1/2 lg:translate-y-[-20%] lg:bottom-auto lg:w-[90%] lg:max-w-5xl
            ${isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"}`}
          />

          <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
            <div
              className={`w-[800px] h-[800px] rounded-full bg-white transition-all duration-700 blur-[100px] ${
                isHovered ? "opacity-40 scale-110" : "opacity-0 scale-75"
              }`}
            />
          </div>

          {/* Foreground CTA Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
            <h3 className="text-[#EEEEEE] alexa text-xl md:text-3xl lg:text-4xl font-semibold mb-1 lg:leading-snug md:leading-snug">
              Ready to Make Sense of Your <br className="hidden md:block" />
              Survey’s Responses?
            </h3>

            <button
              onClick={handleGetStartedClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="mt-6 px-6 md:px-8 lg:px-8 py-3 md:py-4 lg:py-4 bg-[#EEEEEE] text-[#2A3BFF] pop text-sm lg:text-xl md:text-xl rounded-[2rem] font-medium flex items-center justify-center gap-2 hover:shadow-[0_0_12px_#2A3BFF] hover:cursor-pointer"
              style={{
                boxShadow: isHovered ? "0 0 100px #EEEEEE" : "0 0 0px",
              }}
            >
              Get Started Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 lg:w-6 lg:h-6 md:w-6 md:h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16 8.4L7.1 17.3a.984.984 0 0 1-1.4 0 .984.984 0 0 1 0-1.4L14.6 7H7a1 1 0 0 1 0-2h10a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V8.4z" />
              </svg>
            </button>
          </div>
        </section>
      </FadeInSection>

      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <UserAuthForm
            onClose={() => setShowAuthModal(false)}
            onAuthenticated={handleAuthSubmit}
          />
        </div>
      )}
    </>
  );
};

export default CTASection;
