import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SignIn } from "./screens/SignIn";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <SignIn />
  </StrictMode>,
);
