import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Historico from "./pages/Historico";
import ComoUsar from "./pages/ComoUsar";
import Faq from "./pages/Faq";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="historico" element={<Historico />} />
          <Route path="comousar" element={<ComoUsar />} />
          <Route path="faq" element={<Faq />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
