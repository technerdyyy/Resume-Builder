// const API_BASE_URL = "http://localhost:5000/api";

/**
 * Get the current user from localStorage
 * @returns {Object|null} The user object or null if not found
 */
export const getUser = () => {
  const userJson = localStorage.getItem("user");
  return userJson ? JSON.parse(userJson) : null;
};

/**
 * Logout the user by calling the backend and clearing local user data
 */
export const logout = async () => {
  try {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    console.error("Logout error:", err);
  }

  localStorage.removeItem("user");
  window.location.href = "/login";
};

/**
 * General purpose API request with cookie-based auth
 * @param {string} endpoint - The API endpoint to request
 * @param {Object} options - Fetch options (method, body, etc.)
 * @returns {Promise<Object>} - Response data
 */
export const apiRequest = async (endpoint, options = {}) => {
  const fetchOptions = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include", // This is REQUIRED to send cookies
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}${endpoint}`,
      fetchOptions
    );

    if (response.status === 401) {
      await logout();
      return Promise.reject(
        new Error("Your session has expired. Please login again.")
      );
    }

    const data = await response.json();

    if (!response.ok) {
      return Promise.reject(new Error(data.message || "Something went wrong"));
    }

    return data;
  } catch (error) {
    console.error("API request error:", error);
    return Promise.reject(error);
  }
};

/**
 * Fetch the current user's profile using cookies
 * @returns {Promise<Object>} The user profile
 */
export const fetchUserProfile = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/protected`,
    {
      credentials: "include",
    }
  );

  if (!res.ok) {
    const error = new Error(`Failed to fetch profile (${res.status})`);
    error.status = res.status;
    throw error;
  }

  return res.json();
};

// export const fetchUserProfile = async () => {
//   return await apiRequest('/auth/me', { method: 'GET' });
// };
