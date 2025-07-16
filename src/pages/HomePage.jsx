import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/HomePageComponents/Navbar.jsx";
import HeroSection from "../components/HomePageComponents/HeroSection.jsx";
import FeaturesSection from "../components/HomePageComponents/FeaturesSection.jsx";
import UseCasesSection from "../components/HomePageComponents/UseCasesSection.jsx";
import BlogsSection from "../components/HomePageComponents/BlogsSection.jsx";
import AboutSection from "../components/HomePageComponents/AboutSection.jsx";
import CTASection from "../components/HomePageComponents/CTASection.jsx";
import Footer from "../components/HomePageComponents/Footer.jsx";

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const scrollToId = location.state?.scrollTo;
    if (scrollToId) {
      const section = document.getElementById(scrollToId);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 100); // ensures DOM is ready
      }
    }
  }, [location]);

  return (
    <div className="relative pt-[90px] min-h-screen overflow-hidden">
      {/* Bottom layer: solid #EEEEEE */}
      <div className="absolute inset-0 bg-[#EEEEEE] z-0" />

      {/* Top gradient layer with 25% opacity */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, #EEEEEE 0%, #2A3BFF 25%, #2A3BFF 75%, #EEEEEE 100%)",
          opacity: 0.25,
        }}
      />

      {/* Content layer */}
      <div className="relative z-20">
        <Navbar />
        <HeroSection />
        <section id="features"><FeaturesSection /></section>
        <section id="usecases"><UseCasesSection /></section>
        <section id="blogs"><BlogsSection /></section>
        <section id="about"><AboutSection /></section>
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
