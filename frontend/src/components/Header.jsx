import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom"; // 1. Importe o Link
import logo from "../assets/logo.png";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-dark-bg/80 backdrop-blur-sm shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          {/* 2. O logo agora é um Link para a página inicial */}
          <Link to="/">
            <img
              src={logo}
              alt="Camping Vida Longa Logo"
              className="h-16 w-auto"
            />
          </Link>

          {/* 3. Todas as tags <a> foram trocadas por <Link> e o link 'Serviços' foi adicionado */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-main-text hover:text-brand-orange transition-colors duration-300 relative group"
            >
              Início
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
            </Link>
            <Link
              to="/reservas"
              className="text-main-text hover:text-brand-orange transition-colors duration-300 relative group"
            >
              Reservas
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
            </Link>
            <Link
              to="/servicos"
              className="text-main-text hover:text-brand-orange transition-colors duration-300 relative group"
            >
              Serviços
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
            </Link>
            <Link
              to="/contato"
              className="text-main-text hover:text-brand-orange transition-colors duration-300 relative group"
            >
              Contato
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
            </Link>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-main-text text-2xl z-50"
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed top-0 left-0 w-full h-screen bg-dark-bg z-20 flex flex-col justify-center items-center"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
          >
            {/* 4. Links do menu mobile também foram atualizados */}
            <nav className="flex flex-col items-center space-y-8">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-heading text-main-text hover:text-brand-orange transition-colors duration-300"
              >
                Início
              </Link>
              <Link
                to="/reservas"
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-heading text-main-text hover:text-brand-orange transition-colors duration-300"
              >
                Reservas
              </Link>
              <Link
                to="/servicos"
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-heading text-main-text hover:text-brand-orange transition-colors duration-300"
              >
                Serviços
              </Link>
              <Link
                to="/contato"
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-heading text-main-text hover:text-brand-orange transition-colors duration-300"
              >
                Contato
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
