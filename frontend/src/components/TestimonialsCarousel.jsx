import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaArrowLeft, FaArrowRight, FaLeaf } from "react-icons/fa";

// --- CLIENT REVIEWS ---
import C1 from "../assets/testimonials/comentarios1.jpeg";
import C2 from "../assets/testimonials/comentarios2.jpeg";
import C3 from "../assets/testimonials/comentarios3.jpeg";
import C4 from "../assets/testimonials/comentarios4.jpeg";
import C5 from "../assets/testimonials/comentarios5.jpeg";
import C6 from "../assets/testimonials/comentarios6.jpeg";
import C7 from "../assets/testimonials/comentarios7.jpeg";
import C8 from "../assets/testimonials/comentarios8.jpeg";
import C9 from "../assets/testimonials/comentarios9.jpeg";
import C10 from "../assets/testimonials/comentarios10.jpeg";
import C11 from "../assets/testimonials/comentarios11.jpeg";
import C12 from "../assets/testimonials/comentarios12.jpeg";
import C13 from "../assets/testimonials/comentarios13.jpeg";
import C14 from "../assets/testimonials/comentarios14.jpeg";
import C15 from "../assets/testimonials/comentarios15.jpeg";
import C16 from "../assets/testimonials/comentarios16.jpeg";
import C17 from "../assets/testimonials/comentarios17.jpeg";
import C18 from "../assets/testimonials/comentarios18.jpeg";
import C19 from "../assets/testimonials/comentarios19.jpeg";
import C20 from "../assets/testimonials/comentarios20.jpeg";
import C21 from "../assets/testimonials/comentarios21.jpeg";
import C22 from "../assets/testimonials/comentarios22.jpeg";

const testimonialImages = [
  C1, C2, C3, C4, C5, C6, C7, C8, C9, C10,
  C11, C12, C13, C14, C15, C16, C17, C18, C19, C20, C21, C22,
];

function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative group">
      <div className="overflow-hidden p-4" ref={emblaRef}>
        <div className="flex -ml-4">
          {testimonialImages.map((imgSrc, index) => (
            <div
              className="flex-grow-0 flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 pl-4"
              key={index}
            >
              {/* Card Container "Placa de Madeira" */}
              <div className="relative h-full bg-[#2a1b12] rounded-xl shadow-2xl transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-orange-900/20 border-2 border-[#3d2614] overflow-hidden">
                
                {/* Textura/Gradiente de Fundo */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#3d2614] via-[#2a1b12] to-[#1a110a] opacity-90"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
                
                {/* Elementos Decorativos (Folhas) */}
                <FaLeaf className="absolute top-2 right-2 text-brand-green/20 text-4xl transform rotate-12" />
                <FaLeaf className="absolute bottom-2 left-2 text-brand-orange/10 text-3xl transform -rotate-45" />

                {/* Área da Imagem (Print do Comentário) */}
                <div className="relative p-6 h-full flex items-center justify-center">
                   {/* Efeito de "Papel/Foto" colada na madeira */}
                  <div className="relative bg-white p-1 shadow-lg transform rotate-[1deg] group-hover:rotate-0 transition-transform duration-500 rounded-sm">
                    <img
                      src={imgSrc}
                      alt={`Depoimento ${index + 1}`}
                      className="w-full h-auto object-contain rounded-sm"
                      loading="lazy"
                    />
                    {/* Tape/Durex Effect (Visual puramente CSS) */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-white/20 backdrop-blur-sm shadow-sm rotate-[-2deg]"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botões de Navegação Estilo Madeira */}
      <div className="flex justify-center items-center mt-10 gap-6">
        <button
          onClick={scrollPrev}
          className="relative group bg-[#4a3018] text-[#e3cab5] rounded-full p-4 shadow-lg border border-[#5c3d22] overflow-hidden transition-transform duration-200 active:scale-95"
          aria-label="Anterior"
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
          <FaArrowLeft className="relative z-10 text-xl group-hover:-translate-x-1 transition-transform" />
        </button>
        
        <button
          onClick={scrollNext}
          className="relative group bg-[#4a3018] text-[#e3cab5] rounded-full p-4 shadow-lg border border-[#5c3d22] overflow-hidden transition-transform duration-200 active:scale-95"
          aria-label="Próximo"
        >
           <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
          <FaArrowRight className="relative z-10 text-xl group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

export default TestimonialsCarousel;
