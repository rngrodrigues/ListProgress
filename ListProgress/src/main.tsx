
import { createRoot } from 'react-dom/client';
import { AuthProvider } from "./contexts/authContext.tsx";
import { ThemeContextProvider } from "./contexts/themeContext";
import { GlobalStyle } from "./GlobalStyle.ts";
import App from './App.tsx';
import "./reset.css";
import "./toast.css";
createRoot(document.getElementById('root')!).render(

    <ThemeContextProvider>
      <GlobalStyle />
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeContextProvider>

);
