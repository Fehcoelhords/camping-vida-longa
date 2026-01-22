import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";

// Carregamento preguiçoso (Lazy Loading) das páginas para otimizar desempenho
const HomePage = lazy(() => import("./pages/HomePage"));
const ReservationsPage = lazy(() => import("./pages/ReservationsPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

// Componente simples de Loading durante a transição de páginas
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen bg-dark-bg">
    <div className="w-16 h-16 border-4 border-brand-green border-t-brand-orange rounded-full animate-spin"></div>
  </div>
);

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

      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="reservas" element={<ReservationsPage />} />
            <Route path="servicos" element={<ServicesPage />} />
            <Route path="contato" element={<ContactPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
