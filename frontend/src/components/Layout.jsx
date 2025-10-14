import React from "react";
// O Outlet é um componente especial do React Router que renderiza o conteúdo da rota filha.
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

function Layout() {
  return (
    <div className="bg-dark-bg text-main-text font-sans flex flex-col min-h-screen">
      <Header />
      <main>
        {/* O <Outlet/> é o espaço onde o conteúdo de cada página (HomePage, etc.) será inserido */}
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default Layout;
