import Logo from './../../assets/Logo.png';

const Footer = () => {
  return (
    <footer className="text-center pt-8 text-gray-700 border-t-2 border-[#2A3BFF]">
      <img src={Logo} alt="SurvAI Logo" className="h-5 mx-auto mb-2" />
      <p className="pop text-[#555555] font-medium text-lg mb-5 px-4">
        Get Summary of Your Survey Responses in Seconds with AI
      </p>
      <div className="flex flex-col lg:flex-row md:flex-row text-lg justify-center items-center gap-4 lg:gap-8 md:gap-8 mb-6">
        <a
          href="#"
          className="pop text-[#0C0C0C] flex items-center gap-2 font-medium hover:underline"
        >
          <svg viewBox="0 0 1043.63 592.71" className="w-6 h-6">
            <g data-name="Layer 2">
              <g data-name="Layer 1">
                <path
                  d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0
                  296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0
                  154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279
                  147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76
                  249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"
                ></path>
              </g>
            </g>
          </svg>
          Follow us on Medium
        </a>
        <a
          href="#"
          className="pop text-[#0C0C0C] flex items-center gap-2 font-medium hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>
          Reach us via Mail
        </a>
      </div>

      <p className="alexa text-base text-[#555555] mt-10 mb-4">
        © 2025 SurvAI. All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
