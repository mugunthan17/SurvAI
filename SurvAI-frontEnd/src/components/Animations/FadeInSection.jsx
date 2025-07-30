import React, { useRef, useEffect, useState } from "react";

const FadeInSection = ({ children }) => {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[1200ms] ease-out transform
        ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-75 translate-y-8"
        }`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
