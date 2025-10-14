import React from "react";
import { FaQuoteLeft } from "react-icons/fa"; // Ícone de aspas

// O componente recebe os dados do depoimento via props
function TestimonialCard({ quote, author, location }) {
  return (
    // O 'flex-shrink-0' é crucial para o funcionamento do carrossel
    <div className="flex-shrink-0 w-full p-4">
      <div className="bg-brand-green bg-opacity-20 p-8 rounded-2xl shadow-lg flex flex-col h-full">
        <FaQuoteLeft className="text-brand-orange text-3xl mb-4" />
        <p className="text-secondary-text italic mb-6 flex-grow">"{quote}"</p>
        <div>
          <h4 className="font-heading font-bold text-main-text text-lg">
            {author}
          </h4>
          <p className="font-sans text-sm text-secondary-text">{location}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
