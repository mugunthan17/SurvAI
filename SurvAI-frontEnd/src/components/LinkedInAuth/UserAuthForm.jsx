import { useState, useEffect } from "react";

const googleScriptURL = '/api';

const UserAuthForm = ({ onAuthenticated, onClose }) => {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedId = localStorage.getItem("survai_linkedin_id");
    if (savedId) {
      onAuthenticated(savedId);
    }
  }, [onAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedUrl = linkedinUrl.trim();
    const normalizedUrl = trimmedUrl.toLowerCase().replace(/\/+$/,"");
    const regex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_]+\/?$/;
    if (!regex.test(normalizedUrl)) {
      setError("Please enter a valid LinkedIn profile URL.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(googleScriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors", // important!
        body: JSON.stringify({ linkedinId: normalizedUrl }),
      });

      const rawText = await response.text();
      console.log("Raw response from GAS:", rawText);

      const result = JSON.parse(rawText);

      if (result.status !== "success") {
        throw new Error(result.message || "Unknown error from server.");
      }
      if(result.status == "success"){
        localStorage.setItem("survai_linkedin_id", normalizedUrl);
        onAuthenticated(normalizedUrl);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message || "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#00000088] backdrop-blur-sm flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md sm:mx-4"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-4 text-4xl text-[#0C0C0C] hover:cursor-pointer"
        >
          ×
        </button>
        <h2 className="alexa text-2xl font-semibold mt-1 mb-1 text-left text-[#2A3BFF]">
          Welcome to SurvAI
        </h2>
        <p className="pop mb-3 text-[#555555] text-left">
          Please enter your full LinkedIn profile URL
        </p>

        <input
          type="text"
          placeholder="https://www.linkedin.com/in/your-profile"
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          className="pop w-full border-2 p-3 rounded-md mb-4 border-[#2A3BFF] focus:border-2 focus:border-[#2A3BFF]"
        />

        {error && (
          <p className="pop text-[#FF2A2D] text-sm text-center mb-4">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-[#2A3BFF] text-white w-full py-3 rounded-md font-semibold hover:cursor-pointer ${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:brightness-110"
          } transition`}
        >
          {isSubmitting ? "Submitting..." : "Submit & Continue"}
        </button>
      </form>
    </div>
  );
};

export default UserAuthForm;
