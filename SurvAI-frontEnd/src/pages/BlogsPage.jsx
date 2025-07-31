import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./../components/HomePageComponents/Navbar.jsx";
import Footer from "./../components/HomePageComponents/Footer.jsx";
import FadeInSection from "./../components/Animations/FadeInSection.jsx";
import { fetchBlogs } from "./../api/blogsApi.js";

function BlogsPage() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const loadBlogs = async () => {
      const blogData = await fetchBlogs();
      setBlogs(blogData);
    };

    loadBlogs();
  }, []);

  const handleCardClick = (blog) => {
    navigate(`/blog/${blog.notionUniqueId}`, { state: blog });
  };

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

        <h1 className="text-center alexa text-[#0C0C0C] mt-20 text-4xl font-bold">
          Surv<span className="text-[#2A3BFF]">AI</span> Blogs
        </h1>

        <FadeInSection>
          <div className="grid gap-6 md:grid-cols-3 my-16 max-w-6xl mx-auto px-4">
            {blogs.map((blog) => (
              <div
                key={blog.notionUniqueId}
                onClick={() => handleCardClick(blog)}
                className="bg-[#EEEEEE] border-2 border-[#2A3BFF] rounded-3xl shadow-sm hover:shadow-md px-6 py-4 transition text-left cursor-pointer"
              >
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="rounded-xl mb-4 w-full object-cover"
                />
                <h3 className="font-medium alexa text-xl text-[#0C0C0C] line-clamp-2">
                  {blog.title}
                </h3>
                <p className="mt-2 font-medium alexa text-base text-[#555555] line-clamp-3">
                  {blog.content}
                </p>
                <p className="mt-4 text-[#2A3BFF] pop text-sm font-medium">
                  Continue Read ➜
                </p>
              </div>
            ))}
          </div>
        </FadeInSection>

        <Footer />
      </div>
    </div>
  );
}

export default BlogsPage;
