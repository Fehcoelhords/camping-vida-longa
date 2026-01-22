import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";
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

  // Variantes para animação em cascata do menu
  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 80,
        damping: 15,
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 80,
        damping: 15,
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -50 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? "bg-dark-bg/90 backdrop-blur-md shadow-lg border-b border-brand-green/20"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
          {/* Logo */}
          <Link to="/" className="relative z-50">
            <img
              src={logo}
              alt="Camping Vida Longa Logo"
              className="h-14 md:h-16 w-auto drop-shadow-lg transition-transform hover:scale-105 duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: "Início", path: "/" },
              { name: "Reservas", path: "/reservas" },
              { name: "Serviços", path: "/servicos" },
              { name: "Contato", path: "/contato" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-main-text hover:text-brand-orange font-medium tracking-wide transition-colors duration-300 relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left rounded-full"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden z-50">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-main-text bg-brand-green/20 p-2 rounded-full hover:bg-brand-green/40 transition-colors border border-brand-green/30 backdrop-blur-sm"
              aria-label="Toggle Menu"
            >
              <div className="w-6 h-6 flex items-center justify-center relative">
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiX size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiMenu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed top-0 left-0 w-full h-screen z-40 flex flex-col justify-center items-center overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {/* Background Texture Layers */}
            <div className="absolute inset-0 bg-[#1a110a] z-0"></div> {/* Base escura madeira */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#2e1d10] via-[#3d2614] to-[#1a110a] opacity-90 z-0"></div>
            
            {/* Efeito de "Veios da Madeira" (Simulado com gradiente radial repetitivo ou overlay) */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] z-0 mix-blend-overlay"></div>
            
            {/* Vinheta nas bordas para dar profundidade */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none z-0"></div>

            {/* Elementos Decorativos Fundo */}
            <motion.div 
              className="absolute top-20 right-[-50px] text-brand-green/10 transform rotate-45 pointer-events-none"
              animate={{ rotate: 45, y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaLeaf size={300} />
            </motion.div>
             <motion.div 
              className="absolute bottom-20 left-[-50px] text-brand-orange/5 transform -rotate-12 pointer-events-none"
              animate={{ rotate: -12, y: [0, -15, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaLeaf size={250} />
            </motion.div>

            {/* Menu Links Container */}
            <nav className="relative z-10 flex flex-col items-center gap-6 w-full px-8">
              {[
                { name: "Início", path: "/" },
                { name: "Reservas", path: "/reservas" },
                { name: "Serviços", path: "/servicos" },
                { name: "Contato", path: "/contato" },
              ].map((link, index) => (
                <motion.div
                  key={link.path}
                  variants={itemVariants}
                  className="w-full max-w-xs"
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="group relative flex items-center justify-center w-full py-4 text-2xl font-heading font-bold text-[#e3cab5] transition-all duration-300"
                  >
                    {/* Background do botão estilo "Tábua de Madeira" */}
                    <div className="absolute inset-0 bg-[#4a3018] rounded-lg shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.5)] border border-[#5c3d22] transform scale-100 group-hover:scale-105 group-active:scale-95 transition-transform duration-300 origin-center clip-path-polygon"></div>
                    
                    {/* Textura interna do botão */}
                    <div className="absolute inset-1 border border-[#6b4a31] rounded opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Conteúdo Texto e Ícone */}
                    <span className="relative z-10 flex items-center gap-3 drop-shadow-md group-hover:text-white transition-colors">
                      <FaLeaf className="text-brand-orange text-lg opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      {link.name}
                      <FaLeaf className="text-brand-orange text-lg opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 scale-x-[-1]" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            {/* Footer simples do menu */}
            <motion.div 
              variants={itemVariants}
              className="absolute bottom-10 z-10 text-[#a38a75] text-sm font-sans tracking-widest uppercase opacity-60"
            >
              Camping Vida Longa
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
