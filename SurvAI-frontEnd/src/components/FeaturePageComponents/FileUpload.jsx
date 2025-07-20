import { FiX } from "react-icons/fi";
import React, { useState, useRef } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Logo from "./../../assets/Logo.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { answer } from "./../../assets/Data/customQuestionData.js";

const FileUpload = () => {
  const [fileInfo, setFileInfo] = useState(null);
  const [selectedOption, setSelectedOption] = useState("summary");
  const [showSummary, setShowSummary] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showQuestionCard, setShowQuestionCard] = useState(false);
  const [question, setQuestion] = useState("");
  const [askedQuestion, setAskedQuestion] = useState("");
  const customExportRef = useRef(null);
  const exportRef = useRef(null);
  const summaryRef = useRef(null);
  const [summaryData, setSummaryData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [customAnswer, setCustomAnswer] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        alert(
          "The file size exceeds 10MB. Please upload a file smaller than 10MB."
        );
        e.target.value = "";
        return;
      }

      setFileInfo({
        name: file.name,
        size: formatBytes(file.size),
      });
    } else {
      setFileInfo(null);
    }
  };

  const getfullsummary = async () => {
    setIsLoading(true); // Show loading spinner
    console.log("Fetching full summary...");

    try {
      const fileInput = document.getElementById("fileInput");

      if (fileInput?.files?.[0]) {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("http://localhost:3000/api/summary", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        console.log("Summary Response:", data);

        if (!res.ok) {
          console.error("Summary Error:", data.error || "Server Error");
          setErrorMessage(data.error || "Server Error");
          return;
        }

        setSummaryData(data); // Store for displaying
      } else {
        console.warn("No file selected.");
      }
    } catch (err) {
      console.error("Error fetching summary:", err.message);
      setErrorMessage("Something went wrong while analyzing the summary.");
    } finally {
      setIsLoading(false); // Stop spinner
      setShowSummary(true); // Display summary section
      setTimeout(() => {
        summaryRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  const getcustomanswer = async () => {
    setIsLoading(true);
    setShowQuestionCard(false); // Reset previous question card

    try {
      const fileInput = document.getElementById("fileInput");
      if (!fileInput?.files?.[0] || !question.trim()) {
        setErrorMessage("File or question is missing.");
        return;
      }
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("question", question.trim());
      const res = await fetch("http://localhost:3000/api/custom", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Custom Question Response:", data);
      setCustomAnswer(data.answer);
      if (!res.ok) {
        console.error("Custom Question Error:", data.error || "Server Error");
        setErrorMessage(data.error || "Server Error");
        return;
      }
      setAskedQuestion(question);
      setShowQuestionCard(true);
    } catch (err) {
      console.error("Error fetching custom answer:", err.message);
      setErrorMessage(
        "Something went wrong while analyzing the custom question."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFile = () => {
    setFileInfo(null);
    setSelectedOption("summary");
    setQuestion("");
    setShowSummary(false);
    document.getElementById("fileInput").value = "";
  };

  const formatBytes = (bytes) => {
    const sizes = ["Bytes", "KB", "MB", "GB"];
    if (bytes === 0) return "0 Byte";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  const handleExportPDF = async () => {
    if (!exportRef.current) return;
    exportRef.current.style.display = "block";
    await new Promise((resolve) => setTimeout(resolve, 500));
    const canvas = await html2canvas(exportRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 210; // A4 width in mm
    const pxPerMm = canvas.width / imgWidth;
    const imgHeightMm = canvas.height / pxPerMm;
    const pdf = new jsPDF("p", "mm", [imgHeightMm, imgWidth]);
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeightMm);
    pdf.save("SurvAI_Report.pdf");

    exportRef.current.style.display = "none";
    setShowToast(true);
  };

  const Toast = ({ message, onClose }) => {
    React.useEffect(() => {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }, [onClose]);

    return (
      <div className="fixed top-6 right-6 bg-[#2A3BFF] text-[#EEEEEE] px-6 py-3 rounded-lg shadow-lg z-50 pop transition-all">
        {message}
      </div>
    );
  };

  const emotionData = summaryData
    ? [
        {
          name: "Negative",
          value: summaryData.emotionalAnalysis?.negative || 0,
          color: "#FF2A2D",
        },
        {
          name: "Neutral",
          value: summaryData.emotionalAnalysis?.neutral || 0,
          color: "#555555",
        },
        {
          name: "Positive",
          value: summaryData.emotionalAnalysis?.positive || 0,
          color: "#2A3BFF",
        },
      ]
    : [];

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* File upload area */}
      <div className="flex items-center border-2 border-[#2A3BFF] bg-[#EEEEEE] overflow-hidden h-[56px]">
        <label className="text-lg bg-[#2A3BFF] pop text-[#EEEEEE] px-5 py-3 cursor-pointer flex items-center h-full">
          Choose File
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="hidden"
            accept=".csv,.xls,.xlsx"
          />
        </label>
        <div className="flex-1 px-4 py-3 text-lg text-center text-[#555555] bg-[#EEEEEE] truncate flex justify-between items-center h-full">
          {fileInfo ? (
            <>
              <div className="truncate bg-[#EEEEEE]">
                <span className="pop font-medium">{fileInfo.name}</span>
                <span className="pop ml-2 text-[#555555]">
                  ({fileInfo.size})
                </span>
              </div>
              <button
                onClick={handleRemoveFile}
                className="text-red-600 hover:bg-red-100 rounded-full p-1 ml-4 transition flex items-center justify-center cursor-pointer"
                title="Remove file"
              >
                <FiX className="w-4 h-4" />
              </button>
            </>
          ) : (
            <span>No File Chosen</span>
          )}
        </div>
      </div>

      {/* Supported info text */}
      <div className="pop mt-3 text-sm text-gray-600 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 px-1 text-left">
        <span>
          <strong>Supported File Formats:</strong>{" "}
          <span className="text-gray-500">.csv, .xls, .xlsx</span>
        </span>
        <span>
          <strong>Maximum File Size:</strong>{" "}
          <span className="text-gray-500">10MB</span>
        </span>
      </div>

      {fileInfo && (
        <div className="mt-10 space-y-6">
          {/* Option Dropdown */}
          <div className="w-full text-left max-w-6xl mx-auto">
            <label className="pop block text-base font-medium text-[#0C0C0C] mb-2">
              Choose how you'd like to explore your survey data
            </label>
            <select
              className="pop w-full border-2 border-[#2A3BFF] px-4 py-3 bg-[#EEEEEE] focus:outline-none cursor-pointer text-medium"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="summary">
                Generate Full Summary of My Survey Response Data
              </option>
              <option value="custom">
                Ask Custom Questions About My Survey Responses
              </option>
            </select>
          </div>

          {/* Custom Questions Section */}
          {selectedOption === "custom" && (
            <div className="w-full max-w-6xl mx-auto mt-2">
              <div className="flex flex-col sm:flex-row items-stretch gap-4">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="E.g. “What did the user like the most?”"
                  className="mt-2 pop flex-1 border-2 border-[#2A3BFF] px-6 py-3 rounded-full bg-[#EEEEEE] text-[#0C0C0C] focus:outline-none text-medium"
                />
                <button
                  onClick={() => {
                    if (question.trim()) {
                      getcustomanswer();
                    }
                  }}
                  className="alexa bg-[#2A3BFF] text-white px-8 py-4 rounded-full shadow-lg hover:brightness-110 transition font-medium cursor-pointer w-full sm:w-auto mt-2"
                >
                  Ask SurvAI ✨
                </button>
              </div>

              {/* Loading Spinner */}
              {isLoading && (
                <div className="w-full flex justify-center gap-2 items-center py-10">
                  <div
                    className="w-10 h-10 rounded-full animate-spin"
                    style={{
                      background: `conic-gradient(#2A3BFF 25%, #0C0C0C 75%)`,
                      maskImage: `radial-gradient(farthest-side, transparent calc(100% - 4px), black 0)`,
                      WebkitMaskImage: `radial-gradient(farthest-side, transparent calc(100% - 4px), black 0)`,
                    }}
                  ></div>
                  <p className="text-[#2A3BFF] text-xl alexa">
                    Please Wait.....
                  </p>
                </div>
              )}

              {/* Question Card After Loading */}
              {showQuestionCard && (
                <div className="flex flex-col">
                  <div className="mt-8 bg-[#EEEEEE] px-8 py-10 flex flex-col md:flex-row lg:flex-row items-center justify-between">
                    <h1 className="alexa text-xl text-left text-[#0C0C0C] mb-6 md:mb-0 lg:mb-0">
                      QUESTION:{" "}
                      <span className="pop text-xl text-[#0C0C0C] font-base pl-0 md:pl-2 lg:pl-2">
                        {askedQuestion}
                      </span>
                    </h1>
                  </div>
                  <div className="text-left mb-10 pb-8 px-8 bg-[#EEEEEE] text-[#0C0C0C] flex flex-row items-center justify-between">
                    <p className="whitespace-pre-wrap text-lg pop leading-relaxed text-[#2A3BFF]">
                      <h1 className="alexa text-xl text-left text-[#0C0C0C] mb-6 md:mb-0 lg:mb-0">
                        ANSWER:{" "}
                        <span className="pop text-xl text-[#2A3BFF] font-medium pl-0 md:pl-2 lg:pl-2">
                          {customAnswer}
                        </span>
                      </h1>
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Summary Section */}
          {selectedOption === "summary" && (
            <div className="text-center mt-4">
              {!showSummary && (
                <button
                  onClick={getfullsummary}
                  className="mt-2 alexa bg-[#2A3BFF] text-white px-8 py-4 rounded-full shadow-lg hover:brightness-110 transition font-medium cursor-pointer w-full sm:w-auto"
                  style={{ boxShadow: "0 0 12px #2A3BFF88" }}
                >
                  Generate Full Summary ✨
                </button>
              )}

              {isLoading && (
                <div className="w-full flex justify-center gap-2 items-center py-10">
                  <div
                    className="w-10 h-10 rounded-full animate-spin"
                    style={{
                      background: `conic-gradient(#2A3BFF 25%, #0C0C0C 75%)`,
                      maskImage: `radial-gradient(farthest-side, transparent calc(100% - 4px), black 0)`,
                      WebkitMaskImage: `radial-gradient(farthest-side, transparent calc(100% - 4px), black 0)`,
                    }}
                  ></div>
                  <p className="text-[#2A3BFF] text-xl alexa">
                    Please Wait.....
                  </p>
                </div>
              )}

              {showSummary && summaryData && (
                <div
                  ref={summaryRef}
                  className="mt-4 flex flex-col md:flex-row lg:flex-row items-center justify-center"
                >
                  <div className="flex flex-col md:flex-col lg:flex-row gap-0 w-full">
                    {/* Left: Summary */}
                    <div className="mt-4 px-4 mb-0 md:mb-8 lg:mb-8 bg-[#EEEEEE] w-full md:w-full lg:w-[70%] flex flex-col justify-between">
                      <div className="mt-6 mx-2 flex flex-row gap-4 items-center text-left justify-between p-4">
                        <h1 className="alexa text-2xl text-[#2A3BFF]">
                          Survey Summary:
                        </h1>
                        <button
                          onClick={handleExportPDF}
                          className="pop text-medium bg-[#EEEEEE] gap-2 text-[#2A3BFF] px-4 py-2 items-center flex flex-row justify-center hover:cursor-pointer border hover:bg-[#2A3BFF] hover:text-[#EEEEEE]"
                        >
                          Export
                          <svg
                            className="w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 10V4a1 1 0 0 0-1-1H9.914a1 1 0 0 0-.707.293L5.293 7.207A1 1 0 0 0 5 7.914V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2M10 3v4a1 1 0 0 1-1 1H5m5 6h9m0 0-2-2m2 2-2 2"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="text-left text-lg ml-6 text-center items-center mb-6">
                        <p className="pop text-base text-[#0C0C0C] pr-4 py-3 text-left leading-relaxed">
                          {summaryData.summary}
                        </p>
                        <h1 className="mt-6 mb-2 alexa text-2xl text-[#2A3BFF]">
                          Key Points
                        </h1>

                        {summaryData.points.map((point, index) => (
                          <p
                            key={index}
                            className="pop text-base text-[#0C0C0C] pr-4 py-2 text-left leading-relaxed"
                          >
                            ➤ {point}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Right: Emotion Chart */}
                    <div className="mt-4 mb-8 bg-[#EEEEEE] w-full md:w-full lg:w-[30%] flex flex-col justify-evenly items-center p-4">
                      <h1 className="mt-4 alexa text-2xl text-[#0C0C0C] mb-8">
                        Emotional Analysis
                      </h1>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={emotionData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                          >
                            {emotionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="mt-10 w-full text-left">
                        {emotionData.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center mb-4 px-2"
                          >
                            <div className="flex items-center">
                              <span
                                className="w-3 h-3 rounded-full ml-20 md:ml-60 lg:ml-10"
                                style={{ backgroundColor: item.color }}
                              ></span>
                              <span className="text-[#0C0C0C] text-base pop pl-2">
                                {item.name}
                              </span>
                            </div>
                            <span className="text-[#0C0C0C] text-base pop font-semibold mr-20 md:mr-65 lg:mr-20">
                              {item.value.toString().padStart(2, "0")}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {summaryData && (
                <div
                  ref={exportRef}
                  className="hidden w-[794px] bg-white px-10 py-10 text-[#0C0C0C] font-sans flex flex-col"
                >
                  {/* Header */}
                  <div className="text-center mt-8">
                    <img
                      src={Logo}
                      className="h-8 w-auto mb-2 mx-auto"
                      alt="SurvAI Logo"
                    />
                    <p className="pop text-sm text-[#0C0C0C]">
                      Ask, Analyze, and Slay — Powered by{" "}
                      <span className="alexa font-medium">SurvAI</span>
                    </p>
                    <hr className="w-full h-[1px] bg-[#0C0C0C] border-0 mt-4 mb-8" />
                  </div>

                  {/* Main Content */}
                  <div className="flex flex-col text-left">
                    <h1 className="text-2xl text-center font-semibold alexa text-[#0C0C0C] mb-6">
                      Full Summary of Survey Responses Report
                    </h1>

                    <p className="text-lg alexa mt-6 mb-6 text-[#2A3BFF]">
                      <span className="text-[#0C0C0C] font-semibold mr-2">
                        File Name:
                      </span>{" "}
                      {fileInfo?.name || "SampleFile.xlsx"}
                    </p>

                    {/* Summary */}
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold alexa mb-3">
                        Complete Summary:
                      </h2>
                      <p className="ml-6 text-base pop text-[#0C0C0C]">
                        {summaryData.summary}
                      </p>
                    </div>

                    {/* Key Points */}
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold alexa mb-3">
                        Key Points:
                      </h2>
                      <ul className="list-disc ml-6 text-base pop text-[#0C0C0C] space-y-2">
                        {summaryData.points.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Emotional Analysis */}
                    <div className="mb-4">
                      <h2 className="text-lg font-semibold alexa mb-4">
                        Emotional Analysis:
                      </h2>
                      <div className="pt-4 flex flex-col md:flex-row justify-center items-center gap-4">
                        <div className="w-[220px] h-[180px] flex justify-center items-center">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={emotionData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={75}
                                dataKey="value"
                                startAngle={90}
                                endAngle={-270}
                                isAnimationActive={false}
                              >
                                {emotionData.map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                  />
                                ))}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                        </div>

                        <div className="space-y-2 text-base">
                          {emotionData.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center min-w-[160px]"
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  className="inline-block w-3 h-3 rounded-full"
                                  style={{ backgroundColor: item.color }}
                                ></span>
                                <span className="text-[#0C0C0C] pop">
                                  {item.name}
                                </span>
                              </div>
                              <span className="font-semibold pop text-[#0C0C0C]">
                                {item.value.toString().padStart(2, "0")}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer (OUTSIDE content) */}
                  <div className="pt-4 mt-10 border-t border-[#CCCCCC] text-sm text-[#555555] text-center pop">
                    <p className="alexa">
                      © {new Date().getFullYear()} SurvAI. All rights reserved.
                    </p>
                    <p className="mt-1">
                      Generated on{" "}
                      {new Date().toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {showToast && (
        <Toast
          message="Exported PDF successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default FileUpload;
