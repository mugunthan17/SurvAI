import React from "react";
import NM from "./../../assets/reqImgs/NM.png";
import NB from './../../assets/reqImgs/NB.png';
import SRS from './../../assets/reqImgs/SRS.png';

function OurTeam() {
  return (
    <div className="max-w-6xl mx-auto mb-35 text-center px-4 sm:px-4 md:px-4 lg:px-0">
      <h1 className="alexa text-[#2A3BFD] text-lg md:text-xl lg:text-xl font-normal">
        Our Team
      </h1>
      <h1 className="alexa text-[#0C0C0C] text-xl px-4 md:px-4 lg:px-0 md:text-3xl lg:text-4xl font-medium mt-1 mb-10">
        Meet the Humans behind Surv<span className="text-[#2A3BFF]">AI</span>
      </h1>

      {/* Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center text-center justify-center">
        {/* Member 1 */}
        <div className="bg-[#2A3BFF] rounded-3xl p-4 shadow-md">
          <img
            src={NM}
            alt="Mugunthan N"
            className="w-full rounded-2xl object-cover saturate-0 hover:saturate-100 transition duration-300 hover:cursor-pointer"
            onClick={() =>
              window.open("https://www.linkedin.com/in/mugunthann", "_blank")
            }
          />
          <div className="text-[#EEEEEE] mt-4">
            <a
              href="https://www.linkedin.com/in/mugunthann"
              className="alexa text-lg font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Mugunthan N
            </a>
            <p className="pop text-sm font-light mt-1">Founder & Designer</p>
          </div>
        </div>

        {/* Member 2 */}
        <div className="bg-[#2A3BFF] rounded-3xl p-4 shadow-md">
          <img
            src={NB}
            alt="Nitish B"
            className="w-full rounded-2xl object-cover saturate-0 hover:saturate-100 transition duration-300 hover:cursor-pointer"
            onClick={() =>
              window.open("https://www.linkedin.com/in/nitishb-dev/", "_blank")
            }
          />
          <div className="text-[#EEEEEE] mt-4">
            <a
              href="https://www.linkedin.com/in/nitishb-dev/"
              className="alexa text-lg font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Nitish B
            </a>
            <p className="pop text-sm font-light mt-1">
              Co - Founder & Developer
            </p>
          </div>
        </div>

        {/* Member 3 */}
        <div className="bg-[#2A3BFF] rounded-3xl p-4 shadow-md md:col-span-2 md:w-1/2 md:mx-auto lg:col-span-1 lg:w-auto lg:mx-0">
          <img
            src={SRS}
            alt="Sarweshwaran R S"
            className="w-full rounded-2xl object-cover saturate-0 hover:saturate-100 transition duration-300 hover:cursor-pointer"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/sarweshwaranrs/",
                "_blank"
              )
            }
          />
          <div className="text-[#EEEEEE] mt-4">
            <a
              href="https://www.linkedin.com/in/sarweshwaranrs/"
              className="alexa text-lg font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Sarweshwaran R S
            </a>
            <p className="pop text-sm font-light mt-1">
              Co - Founder & Developer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurTeam;
