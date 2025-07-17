import React from 'react'
import Navbar from './../components/HomePageComponents/Navbar.jsx';
import Footer from './../components/HomePageComponents/Footer.jsx';

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
    {
      title: "From Feedback to Action: Turning Survey Respons ....",
      image: "/assets/blog3.png",
    },
    {
      title: "From Feedback to Action: Turning Survey Respons ....",
      image: "/assets/blog3.png",
    },
    {
      title: "From Feedback to Action: Turning Survey Respons ....",
      image: "/assets/blog3.png",
    },
    {
      title: "From Feedback to Action: Turning Survey Respons ....",
      image: "/assets/blog3.png",
    },
    {
      title: "From Feedback to Action: Turning Survey Respons ....",
      image: "/assets/blog3.png",
    },
    {
      title: "From Feedback to Action: Turning Survey Respons ....",
      image: "/assets/blog3.png",
    },
    {
      title: "From Feedback to Action: Turning Survey Respons ....",
      image: "/assets/blog3.png",
    },
    {
      title: "From Feedback to Action: Turning Survey Respons ....",
      image: "/assets/blog3.png",
    },
    {
      title: "From Feedback to Action: Turning Survey Respons ....",
      image: "/assets/blog3.png",
    },
  ];

function BlogsPage() {
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

        <h1 className='text-center alexa text-[#0C0C0C] mt-20 text-4xl font-bold'>Surv<span className="text-[#2A3BFF]">AI</span> Blogs</h1>
        <div className="grid gap-6 md:grid-cols-3 my-15 max-w-6xl mx-auto">
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

        <Footer />
      </div>
    </div>
  )
}

export default BlogsPage
