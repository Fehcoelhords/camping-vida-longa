import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaWhatsapp } from "react-icons/fa";

function ServiceModal({ show, onClose, serviceData }) {
  if (!serviceData) return null;

  const handleReserveClick = () => {
    onClose();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {show && (
        // --- MUDANÇA NO OVERLAY ---
        // Adicionamos overflow-y-auto aqui e mudamos para items-start
        // Isso fará a PÁGINA rolar se o modal for muito grande, em vez de o modal rolar internamente
        <motion.div
           className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex justify-center items-start overflow-y-auto p-4 py-10"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           onClick={onClose}
         >
           {/* --- MUDANÇA NO CONTEÚDO DO MODAL --- */}
           {/* Removemos max-h-[90vh] e a estrutura flex-col interna para que ele possa crescer */}
           <motion.div
             className="relative z-50 bg-dark-bg text-main-text rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden border border-brand-green/20"
             initial={{ opacity: 0, scale: 0.9, y: 50 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.9, y: 50 }}
             transition={{ type: "spring", stiffness: 100, damping: 20 }}
             onClick={(e) => e.stopPropagation()}
           >
             {/* Header com Imagem Hero (Primeira imagem da lista) */}
             <div className="relative h-64 md:h-80">
               <img
                 src={serviceData.images[0] || serviceData.mainImage}
                 alt={serviceData.title}
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent"></div>
               
               {/* Botão Fechar Flutuante - Z-index aumentado e área de toque maior */}
               <button
                 onClick={onClose}
                 className="absolute top-4 right-4 z-[60] bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors backdrop-blur-sm shadow-lg border border-white/10"
                 aria-label="Fechar Modal"
               >
                 <FaTimes size={24} />
               </button>
 
               {/* Título sobre a Imagem */}
               <div className="absolute bottom-6 left-6 md:left-10">
                 <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-white drop-shadow-lg">
                   {serviceData.title}
                 </h2>
                 <div className="h-1 w-24 bg-brand-orange mt-2 rounded-full"></div>
               </div>
             </div>
 
             {/* Conteúdo Principal */}
             <div className="p-6 md:p-10">
               <div className="space-y-6">
                 <p className="font-sans text-lg text-secondary-text leading-relaxed whitespace-pre-wrap">
                   {serviceData.description}
                 </p>
 
                 {/* Galeria de Fotos Restantes */}
                 <h3 className="text-xl font-heading font-bold text-main-text mt-8 mb-4 border-l-4 border-brand-orange pl-3">
                   Galeria de Fotos
                 </h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   {serviceData.images.map((image, index) => (
                     <motion.div
                       key={index}
                       className="overflow-hidden rounded-xl aspect-square cursor-pointer shadow-md"
                       whileHover={{ scale: 1.05 }}
                       transition={{ duration: 0.2 }}
                     >
                       <img
                         src={image}
                         alt={`${serviceData.title} ${index + 1}`}
                         className="w-full h-full object-cover"
                       />
                     </motion.div>
                   ))}
                 </div>
               </div>
 
               {/* Footer com Ações */}
               <div className="pt-8 mt-10 border-t border-white/10 flex flex-col md:flex-row gap-4">
                 <button
                   onClick={handleReserveClick}
                   className="flex-1 bg-brand-orange hover:bg-orange-600 text-white font-bold font-heading py-4 px-6 rounded-xl shadow-lg shadow-orange-500/20 transform hover:-translate-y-1 transition-all duration-300 text-lg uppercase tracking-wide"
                 >
                   Confirmar Reserva
                 </button>
 
                 <a
                   href={`https://wa.me/5511947367682?text=Olá! Gostaria de tirar uma dúvida sobre o serviço de ${serviceData.title}.`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex-1 bg-transparent border-2 border-green-500 text-green-400 font-bold font-heading py-4 px-6 rounded-xl hover:bg-green-500 hover:text-white transition-all duration-300 text-lg flex items-center justify-center gap-2"
                 >
                   <FaWhatsapp className="text-2xl" />
                   Tirar Dúvidas
                 </a>
               </div>
             </div>
           </motion.div>
         </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ServiceModal;
