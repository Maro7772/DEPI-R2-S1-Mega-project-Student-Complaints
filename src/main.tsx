import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import StudentDashboard from "./Student/StudentDashboard";
import Dashboard from "./Dashboard/Dashboard";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Dashboard/>
  </StrictMode>
);
