import { createRoot } from "react-dom/client";
import { AuthProvider } from "@/contexts/authContext";
import { ThemeContextProvider } from "@/contexts/themeContext";
import { GlobalStyle } from "@/GlobalStyle";
import App from "@/App";
import "@/reset.css";
import "@/toast.css";

createRoot(document.getElementById("root")!).render(
  <ThemeContextProvider>
    <GlobalStyle />
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeContextProvider>
);
