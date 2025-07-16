import React, { use } from "react";
import { useNavigate } from "react-router-dom";

const BlogsSection = () => {
  const navigate = useNavigate();
  const blogs = [
    {
      title: "The Art of Asking: How to Write Survey Questions ....",
      image: "/assets/blog1.png", // replace with your actual image paths
    },
    {
      title: "Beyond the Checkbox: How to Collect Respons ....",
      image: "/assets/blog2.png",
    },
    {
      title: "From Feedback to Action: Turning Survey Respons ....",
      image: "/assets/blog3.png",
    },
  ];

  return (
    <section id="blogs" className="py-36 px-4 text-center">
      {/* Section Title */}
      <h2 className="text-3xl lg:text-4xl md:text-3xl alexa font-bold mb-2 text-[#0C0C0C]">
        Surv<span className="text-[#2A3BFF]">AI</span> Blogs
      </h2>
      <p className="text-[#555555] text-xl font-semibold pop">
        Blogs that will sharpen your questions, improve responses, & guide
        smarter decisions.
      </p>
      <a
        onClick={() => navigate("/blogs")}
        className="text-[#2A3BFF] pop text-xl font-medium text-sm inline-block hover:cursor-pointer"
      >
        ➡️ Explore More Blogs ⬅️
      </a>

      {/* Blog Cards */}
      <div className="grid gap-6 md:grid-cols-3 mt-6 max-w-6xl mx-auto">
        {blogs.map((blog, idx) => (
          <div
            key={idx}
            className="bg-white border-2 border-[#2A3BFF] rounded-3xl shadow-sm hover:shadow-md px-6 py-4 transition text-left"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="rounded-xl mb-4 w-full h-48 object-cover"
            />
            <h3 className="font-medium alexa text-xl text-[#0C0C0C]">
              {blog.title}
            </h3>
            <a
              href="#"
              className="text-[#2A3BFF] pop text-sm font-medium hover:cursor-pointer"
            >
              Continue Read ➜
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogsSection;
