import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import Logo from './../../assets/Logo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleTryNowClick = () => {
    setMenuOpen(false);
    navigate("/feature");
  };

  const handleLogoClick = () => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleNavClick = (sectionId) => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 mx-auto lg:w-full px-4">
      <div className="relative max-w-6xl mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between border-2 border-[#2A3BFF] rounded-3xl px-8 py-4 bg-[#EEEEEE]/35 backdrop-blur-sm shadow-none">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
            <img src={Logo} alt="SurvAI Logo" className="h-4 md:h-5 lg:h-5 w-auto hover:cursor-pointer" />
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex pop space-x-8 font-semibold text-lg text-[#0C0C0C]">
            <li><button onClick={() => handleNavClick("features")} className="hover:text-[#2A3BFF] transition hover:cursor-pointer">Features</button></li>
            <li><button onClick={() => handleNavClick("usecases")} className="hover:text-[#2A3BFF] transition hover:cursor-pointer">Use Cases</button></li>
            <li><button onClick={() => handleNavClick("blogs")} className="hover:text-[#2A3BFF] transition hover:cursor-pointer">Blogs</button></li>
            <li><button onClick={() => handleNavClick("about")} className="hover:text-[#2A3BFF] transition hover:cursor-pointer">About Us</button></li>
          </ul>

          {/* CTA button (desktop only) */}
          <button
            onClick={handleTryNowClick}
            className="hidden lg:inline-flex pop items-center gap-1 px-5 py-2 rounded-full text-white bg-[#2A3BFF] text-base font-normal transition-shadow hover:shadow-[0_0_12px_#2A3BFF88] cursor-pointer"
          >
            Try for free
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8.4L7.1 17.3a.984.984 0 0 1-1.4 0 .984.984 0 0 1 0-1.4L14.6 7H7a1 1 0 0 1 0-2h10a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V8.4z" />
            </svg>
          </button>

          {/* Hamburger for small/medium screens */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-[#2A3BFF] text-2xl"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Dropdown menu for small/medium screens */}
        {menuOpen && (
          <div className="absolute left-0 right-0 mt-2 bg-white rounded-3xl shadow-md p-4 border-2 border-[#2A3BFF] lg:hidden">
            <ul className="space-y-4 text-center font-medium text-[#0C0C0C]">
              <li><button onClick={() => handleNavClick("features")}>Features</button></li>
              <li><button onClick={() => handleNavClick("usecases")}>Use Cases</button></li>
              <li><button onClick={() => handleNavClick("blogs")}>Blogs</button></li>
              <li><button onClick={() => handleNavClick("about")}>About Us</button></li>
              <li>
                <button
                  onClick={handleTryNowClick}
                  className="block w-full pop mt-2 px-4 py-2 bg-[#2A3BFF] text-white rounded-full flex items-center justify-center gap-2 transition-shadow hover:shadow-[0_0_12px_#2A3BFF88]"
                >
                  Try for free
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8.4L7.1 17.3a.984.984 0 0 1-1.4 0 .984.984 0 0 1 0-1.4L14.6 7H7a1 1 0 0 1 0-2h10a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V8.4z" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
