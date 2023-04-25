export const includeAuthTokenInRequest = (config) => {
  if (typeof window !== "undefined") {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return config;
};
