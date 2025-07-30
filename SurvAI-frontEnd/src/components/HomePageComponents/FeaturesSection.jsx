import FadeInSection from "./../Animations/FadeInSection.jsx";
const FeaturesSection = () => {
  const features = [
    {
      title: "Smart Question Insights ❓",
      description:
        "Simply upload the response file. Let SurvAI analyze it and get all the insights by just asking it.",
    },
    {
      title: "Full Survey Analysis 📊",
      description:
        "Let SurvAI analyze the entire survey and let you know the key trends and insights instantly.",
    },
    {
      title: "Emotional Tone Detection 😊",
      description:
        "SurvAI analyses the Survey’s Response & classify the response as Positive, Negative, or Neutral.",
    },
    {
      title: "One-Click Report Export 📄",
      description:
        "Download your complete SurvAI summary report instantly in a clean, professional PDF report.",
    },
  ];

  return (
    <FadeInSection>
      <section id="features" className="py-36 px-4 text-center">
        <h2 className="text-3xl lg:text-4xl md:text-3xl alexa px-2 font-bold mb-12 text-[#0C0C0C]">
          Features - What Surv<span className="text-[#2A3BFF]">AI</span> Can Do
          for You
        </h2>

        <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-[#2A3BFF] rounded-3xl py-8 px-12 text-left shadow hover:shadow-md transition"
            >
              <h3 className="text-[#0C0C0C] text-xl alexa font-semibold mb-1">
                {feature.title}
              </h3>
              <p className="text-[#555555] pop text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </FadeInSection>
  );
};

export default FeaturesSection;
