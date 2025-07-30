import UC1 from "./../../assets/reqImgs/UC1.png";
import UC2 from "./../../assets/reqImgs/UC2.png";
import UC3 from "./../../assets/reqImgs/UC3.png";
import UC4 from "./../../assets/reqImgs/UC4.png";
import FadeInSection from "./../Animations/FadeInSection.jsx";

const useCases = [
  {
    icon: UC1,
    title: "Analysts & CX Experts",
    description:
      "Make sense of NPS and customer satisfaction surveys. Identify pain points and growth opportunities quickly.",
  },
  {
    icon: UC2,
    title: "Product Teams",
    description:
      "Understand customer feedback from feature surveys. Prioritize improvements based on what users actually say.",
  },
  {
    icon: UC3,
    title: "HR & People Teams",
    description:
      "Summarize employee engagement & pulse surveys. Track team sentiment & internal satisfaction over time.",
  },
  {
    icon: UC4,
    title: "Govt & Public Services",
    description:
      "Get quick summaries from large-scale public feedback forms and citizen response surveys in multiple languages.",
  },
];

const UseCasesSection = () => {
  return (
    <FadeInSection>
      <section id="usecases" className="py-36 px-4 text-center">
        <h2 className="text-3xl lg:text-4xl md:text-3xl alexa font-bold mb-12 text-[#0C0C0C]">
          Use Cases – How Teams Use Surv
          <span className="text-[#2A3BFF]">AI</span>
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {useCases.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#EEEEEE] border-2 border-[#2A3BFF] rounded-3xl p-8 shadow-sm hover:shadow-md transition text-center"
            >
              <img
                src={item.icon}
                alt={item.title}
                className="w-28 h-28 mx-auto mb-2 object-contain"
              />
              <h3 className="font-semibold alexa text-lg mb-2 text-[#0C0C0C]">
                {item.title}
              </h3>
              <p className="pop text-sm text-[#555555]">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </FadeInSection>
  );
};

export default UseCasesSection;
