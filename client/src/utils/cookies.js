import Cookies from "js-cookie";

// Set cookie with secure options
export const setAuthToken = (token) => {
  Cookies.set("access_token", token, {
    expires: 7, // 7 days
    secure: import.meta.env.PROD, // Only use secure in production (HTTPS)
    sameSite: "strict", // Protect against CSRF attacks
    path: "/",
  });
};

// Get auth token from cookie
export const getAuthToken = () => {
  return Cookies.get("access_token");
};

// Remove auth token (logout)
export const removeAuthToken = () => {
  Cookies.remove("access_token", { path: "/" });
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getAuthToken();
};
