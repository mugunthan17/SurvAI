import React ,{useEffect}from "react";
import Navbar from "../components/HomePageComponents/Navbar.jsx";
import Footer from './../components/HomePageComponents/Footer.jsx';
import AboutUsHero from './../components/AboutUsPageComponents/AboutUsHero.jsx';
import MissionVision from './../components/AboutUsPageComponents/MissionVision.jsx';
import CoreValues from './../components/AboutUsPageComponents/CoreValues.jsx';
import OurTeam from './../components/AboutUsPageComponents/OurTeam.jsx';


const AboutUsPage = () => {
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  return (
    <div className="relative pt-[90px] min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[#EEEEEE] z-0" />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, #EEEEEE 0%, #2A3BFF 25%, #2A3BFF 75%, #EEEEEE 100%)",
          opacity: 0.25,
        }}
      />

      <div className="relative z-20">
        <Navbar />
        <AboutUsHero />
        <MissionVision />
        <CoreValues/>
        <OurTeam />
        <Footer />
      </div>
    </div>
  );
};

export default AboutUsPage;
