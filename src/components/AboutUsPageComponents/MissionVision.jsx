import React from "react";
import OurMission from "./../../assets/reqImgs/OurMission.png";
import OurMissionMedium from "./../../assets/reqImgs/OurMissionMedium.png";
import OurVision from "./../../assets/reqImgs/OurVision.png";
import OurVisionMedium from "./../../assets/reqImgs/OurVisionMedium.png";

function MissionVision() {
  return (
    <div>
      {/* For small & medium screens */}
      <div>
        <div className="mx-auto flex items-center flex-col lg:hidden px-4 mt-25 md:mt-30">
          <h1 className="alexa text-[#2A3AF7] text-2xl md:text-5xl font-medium text-center mb-4">
            Our Mission in SurvAI
          </h1>
          <img
            src={OurMissionMedium}
            alt="Our Mission"
            className="w-[93%] md:w-full md:h-auto mb-4 mt-1 mb-1 md:mt-5 md:mb-5"
          />
          <p className="pop text-[#555555] text-lg md:text-3xl/10 px-4 font-normal text-justify mt-4 ">
            We are on a mission to make survey analysis seamless, smart, and
            accessible for everyone. SurvAI empowers you with real-time
            summaries, emotional insights, and actionable data at your
            fingertips. By simplifying the way you interpret responses, we help
            you uncover key patterns and drive better decisions—faster than ever
            before.
          </p>
        </div>

        {/* For large screens only */}
        <div className="max-w-6xl hidden mt-50 lg:flex lg:flex-row justify-between items-center mx-auto">
          <div className="lg:w-2/2">
            <h1 className="alexa text-[#2A3AF7] text-4xl font-medium text-left mb-6">
              Our Mission
            </h1>
            <p className="pop text-[#555555] text-lg font-normal text-left mr-20">
              We are on a mission to make survey analysis seamless, smart, and
              accessible for everyone. SurvAI empowers you with real-time
              summaries, emotional insights, and actionable data at your
              fingertips. By simplifying the way you interpret responses, we
              help you uncover key patterns and drive better decisions—faster
              than ever before.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img src={OurMission} alt="Our Mission" className="w-100 h-auto" />
          </div>
        </div>
      </div>

      {/*Vision*/}
      <div>
        <div className="mx-auto flex items-center flex-col lg:hidden px-4 mt-25">
          <h1 className="alexa text-[#2A3AF7] text-2xl md:text-5xl font-medium text-center mb-4">
            Our Vision in SurvAI
          </h1>
          <img
            src={OurVisionMedium}
            alt="Our Mission"
            className="w-[93%] md:w-full md:h-auto mb-4 mt-1 mb-1 md:mt-5 md:mb-5"
          />
          <p className="pop text-[#555555] text-lg md:text-3xl/10 px-4 font-normal text-justify mt-4 ">
            We are on a mission to make survey analysis seamless, smart, and
            accessible for everyone. SurvAI empowers you with real-time
            summaries, emotional insights, and actionable data at your
            fingertips. By simplifying the way you interpret responses, we help
            you uncover key patterns and drive better decisions—faster than ever
            before.
          </p>
        </div>

        {/* For large screens only */}
        <div className="max-w-6xl hidden mt-10 lg:flex lg:flex-row justify-between items-center mx-auto">
          <div className="lg:w-1/2">
            <img src={OurVision} alt="Our Mission" className="w-100 h-auto" />
          </div>
          <div className="lg:w-2/2">
            <h1 className="alexa text-[#2A3AF7] text-4xl font-medium text-left mb-6 ml-25">
              Our Vision
            </h1>
            <p className="pop text-[#555555] text-lg font-normal text-left ml-25">
              At SurvAI, we envision a world where survey data transforms into
              intelligent insights effortlessly. We believe understanding user
              sentiment and feedback shouldn’t be complex — and our AI-driven
              platform empowers businesses, researchers, and creators to unlock
              meaning from responses with unmatched clarity and speed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MissionVision;
