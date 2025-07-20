const BASE_URL = "http://localhost:5000/api";

export const analyzeSummary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(`${BASE_URL}/summary`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Server Error");
    }

    return data;
  } catch (err) {
    console.error("Summary Error:", err.message);
    return { error: "Failed to fetch" };
  }
};
 

export const analyzeCustom = async (file, question) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("question", question);

  try {
    const response = await fetch(`${BASE_URL}/custom`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Response from server:", data);
    return data;
  } catch (err) {
    console.error("Error analyzing custom question:", err);
    return { error: err.message };
  }
};
