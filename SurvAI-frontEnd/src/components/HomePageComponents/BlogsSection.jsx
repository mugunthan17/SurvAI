import React from "react";
import { useNavigate } from "react-router-dom";
import blogs from "../../../public/BlogsData/blogs.js";

const BlogsSection = () => {
  const navigate = useNavigate();

  const handleCardClick = (blog) => {
    navigate(`/blog/${blog.id}`, { state: blog });
  };

  return (
    <section id="blogs" className="py-36 px-4 text-center">
      <h2 className="text-3xl lg:text-4xl md:text-3xl alexa font-bold mb-2 text-[#0C0C0C]">
        Surv<span className="text-[#2A3BFF]">AI</span> Blogs
      </h2>
      <p className="text-[#555555] text-xl font-semibold pop">
        Blogs that will sharpen your questions, improve responses, & guide
        smarter decisions.
      </p>

      <a
        onClick={() => navigate("/blogs")}
        className="text-[#2A3BFF] pop text-xl font-medium inline-block mt-2 hover:cursor-pointer"
      >
        ➡️ Explore More Blogs ⬅️
      </a>

      {/* Only First 3 Blog Cards */}
      <div className="grid gap-6 md:grid-cols-3 mt-6 py-2 max-w-6xl mx-auto">
        {blogs.slice(0, 3).map((blog) => (
          <div
            key={blog.id}
            onClick={() => handleCardClick(blog)}
            className="bg-[#EEEEEE] border-2 border-[#2A3BFF] rounded-3xl shadow-sm hover:shadow-md px-6 py-4 transition text-left cursor-pointer"
          >
            <img
              src={blog.image}
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
    </section>
  );
};

export default BlogsSection;
