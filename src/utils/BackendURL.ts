export const BackendURL =
  process.env.NODE_ENV === "production"
    ? "https://surfergram.onrender.com"
    : "http://localhost:4006";
