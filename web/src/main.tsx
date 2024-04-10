import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SvixProvider } from "svix-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SvixProvider
      token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTI2ODU4MjAsImV4cCI6MTcxNTEwNTAyMCwibmJmIjoxNzEyNjg1ODIwLCJpc3MiOiJzdml4LXNlcnZlciIsInN1YiI6ImFwcF8yZXNHRUoyR0MzWGdLc2Z4d2xNY3dtVGV1RDciLCJvcmciOiJvcmdfMjNyYjhZZEdxTVQwcUl6cGdHd2RYZkhpck11In0.oVtaK6aGeCjGOkjIv3EN0Ams4oALs6A5TUn1xarZ5x8"
      appId="app_2esGEJ2GC3XgKsfxwlMcwmTeuD7"
      options={{
        serverUrl: "http://backend.webhooksss.orb.local",
      }}
    >
      <App />
    </SvixProvider>
  </React.StrictMode>
);
