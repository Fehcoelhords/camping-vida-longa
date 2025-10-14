import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

// 1. Importe os novos componentes de página
import ReservationsPage from "./pages/ReservationsPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1A1A1A",
            color: "#EAEAEA",
            border: "1px solid #2E4C3E",
          },
          success: { iconTheme: { primary: "#FF7A00", secondary: "#1A1A1A" } },
          error: { iconTheme: { primary: "#ff4b4b", secondary: "#1A1A1A" } },
        }}
      />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          {/* 2. Adicione as rotas para as novas páginas aqui */}
          <Route path="reservas" element={<ReservationsPage />} />
          <Route path="servicos" element={<ServicesPage />} />
          <Route path="contato" element={<ContactPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
