import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./../HomePageComponents/Navbar.jsx";
import Footer from "./../HomePageComponents/Footer.jsx";
import FadeInSection from "./../Animations/FadeInSection.jsx";

function EntireBlog() {
  const location = useLocation();
  const blog = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!blog) {
      navigate("/blogs");
    }
  }, [blog, navigate]);

  if (!blog) return null;

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

        <div className="max-w-6xl mx-auto mt-15 md:mt-20 mb-20 px-4 lg:px-0">
          <FadeInSection>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl  alexa font-bold text-[#0C0C0C] mb-4">
                {blog.title}
              </h1>
              <p className="text-md pop text-[#2A3BFF] mb-6">
                By {blog.author}
              </p>
            </div>
          </FadeInSection>
          <FadeInSection>
            <img
              src={blog.image}
              alt={blog.title}
              className="rounded-2xl w-full max-h-[400px] object-cover mb-2"
            />
          </FadeInSection>
          <div>
            <div
              className="mt-8 prose max-w-none text-[#0C0C0C] text-xl [&_a]:text-[#2A3BFF]"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default EntireBlog;
