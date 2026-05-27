/**
 * Centralized API client for the frontend.
 * Provides a simple wrapper around window.fetch with error handling
 * and automatic JSON stringification.
 */

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

async function fetchApi(endpoint, options = {}) {
  // Ensure endpoint starts with a slash
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}${path}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { detail: response.statusText || "Unknown network error" };
      }
      
      // Map common FastAPI detail structures
      const message = errorData.detail 
        ? (typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail))
        : "An API error occurred";
        
      throw new Error(message);
    }

    // Handle 204 No Content
    if (response.status === 204) return null;

    return await response.json();
  } catch (error) {
    console.error(`API Fetch Error [${url}]:`, error.message);
    throw error;
  }
}

export const api = {
  get: (endpoint) => fetchApi(endpoint, { method: "GET" }),
  post: (endpoint, body) =>
    fetchApi(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
