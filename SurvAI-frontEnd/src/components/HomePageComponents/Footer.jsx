import Logo from "./../../assets/Logo.png";
import FadeInSection from "./../Animations/FadeInSection.jsx";

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <FadeInSection>
      <footer className="text-center pt-8 text-gray-700 border-t-2 border-[#2A3BFF]">
        <img src={Logo} alt="SurvAI Logo" className="h-5 mx-auto mb-2" />
        <p className="pop text-[#555555] font-medium text-lg mb-5 px-4">
          Get Summary of Your Survey Responses in Seconds with AI
        </p>
        <div className="flex flex-col lg:flex-row md:flex-row text-lg justify-center items-center gap-4 lg:gap-8 md:gap-8 mb-6">
          <a
            href="mailto:survaicontact@gmail.com"
            className="pop text-[#0C0C0C] flex items-center gap-2 font-medium hover:underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
            </svg>
            Reach us via Mail
          </a>
        </div>

        <p className="alexa text-base text-[#555555] mt-10 mb-4">
          © {year} SurvAI. All Rights Reserved
        </p>
      </footer>
    </FadeInSection>
  );
};

export default Footer;
