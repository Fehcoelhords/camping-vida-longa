import React from "react";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import logo from "../assets/logo.png"; // Reutilizando nosso logo

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-bg text-secondary-text font-sans pt-16 pb-6 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
          {/* Coluna 1: Logo e Slogan */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img
              src={logo}
              alt="Camping Vida Longa Logo"
              className="h-12 w-auto mb-4"
            />
            <p className="max-w-xs">
              O lugar para se reconectar de verdade com a natureza e criar
              memórias inesquecíveis.
            </p>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h4 className="font-heading text-lg text-main-text font-bold mb-4">
              Navegação
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-brand-orange transition-colors"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-brand-orange transition-colors"
                >
                  Reservas
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-brand-orange transition-colors"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div>
            <h4 className="font-heading text-lg text-main-text font-bold mb-4">
              Contato
            </h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-brand-orange mt-1 mr-3 flex-shrink-0" />
                <span>
                  Praia da Longa, 01
                  <br />
                  Ilha Grande, Angra dos Reis - RJ
                </span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-brand-orange mr-3" />
                <span>(11) 94736-7682</span>
              </div>
            </div>
          </div>

          {/* Coluna 4: Mapa */}
          <div className="w-full h-48 rounded-lg overflow-hidden">
            {/* COLE AQUI O SEU CÓDIGO DO GOOGLE MAPS, 
              FAZENDO OS AJUSTES PARA JSX COMO NO EXEMPLO ABAIXO.
              Note que mudei width e height para "100%".
            */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.777005479042!2d-44.2259648850388!3d-22.66170568513813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9c5db5a312457b%3A0x8091a422a55f7b0b!2sPraia%20Longa%2C%20Angra%20dos%20Reis%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1679080000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Linha de Copyright */}
        <div className="border-t border-brand-green/20 pt-6 text-center text-sm">
          <p>
            &copy; {currentYear} Camping Vida Longa. Todos os direitos
            reservados. Desenvolvido por Orbit IA.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
