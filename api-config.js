let backendHost;

if (process.env.NODE_ENV === "development") {
  backendHost = "http://localhost:3004";
} else {
  backendHost = "https://recipe-app-back-end.herokuapp.com";
}

export const API_ROOT = `${backendHost}`;
