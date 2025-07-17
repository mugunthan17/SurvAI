import React from "react";
import FileUpload from './../components/FeaturePageComponents/FileUpload.jsx';
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

const FeaturePage = () => {
   const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f3ff] to-[#c5cbf9] text-center px-4 pt-15">
      <img onClick={()=>navigate("/")} src={Logo} alt="SurvAI Logo" className="h-6 mx-auto mb-4 hover:cursor-pointer" />
      <p className="alexa text-lg mb-10 text-[#0C0C0C] font-normal">
        Upload your survey file to Get Started
      </p>
      <FileUpload />
    </div>
  );
};

export default FeaturePage;
