import React from "react";
import Simplicity from "./../../assets/reqImgs/Simplicity.png";
import Innovation from "./../../assets/reqImgs/Innovation.png";
import Integrity from "./../../assets/reqImgs/Integrity.png";
import Empathy from "./../../assets/reqImgs/Empathy.png";

const coreValues = [
  {
    icon: Simplicity,
    title: "Simplicity",
  },
  {
    icon: Innovation,
    title: "Innovation",
  },
  {
    icon: Integrity,
    title: "Integrity",
  },
  {
    icon: Empathy,
    title: "Empathy",
  },
];

function CoreValues() {
  return (
    <div>
      <section id="usecases" className="py-46 px-4 text-center">
        <h1 className="alexa text-[#2A3AF7] text-4xl font-medium mb-6">
          Our Core Values
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {coreValues.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#EEEEEE] border-2 border-[#2A3BFF] rounded-3xl p-8 shadow-sm hover:shadow-md transition text-center"
            >
              <img
                src={item.icon}
                alt={item.title}
                className="w-28 h-28 mx-auto mb-6 object-contain"
              />
              <h3 className="font-normal pop text-xl text-[#0C0C0C]">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CoreValues;
