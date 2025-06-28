import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChatBotUi } from "./screens/ChatBotUi";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <ChatBotUi />
  </StrictMode>,
);
