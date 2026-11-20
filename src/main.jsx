import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { GroupContext } from "./contexts/GroupContext.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GroupContext.Provider
      value={{
        groupName: "Akiba Track",
        targetContribution: 50000,
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GroupContext.Provider>
  </StrictMode>
);