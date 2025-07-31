// src/api/blogsApi.js
const BASE_URL = "http://localhost:3000/api";

export async function fetchBlogs() {
  try {
    const response = await fetch(`${BASE_URL}/blogs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetched blogs:", data);
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}
