import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// --- 1. IMPORTANDO TODAS AS 22 IMAGENS ---
// (Certifique-se que os nomes e extensões dos arquivos batem exatamente)
import C1 from "../assets/testimonials/comentarios1.JPEG";
import C2 from "../assets/testimonials/comentarios2.JPEG";
import C3 from "../assets/testimonials/comentarios3.JPEG";
import C4 from "../assets/testimonials/comentarios4.JPEG";
import C5 from "../assets/testimonials/comentarios5.JPEG";
import C6 from "../assets/testimonials/comentarios6.JPEG";
import C7 from "../assets/testimonials/comentarios7.JPEG";
import C8 from "../assets/testimonials/comentarios8.JPEG";
import C9 from "../assets/testimonials/comentarios9.JPEG";
import C10 from "../assets/testimonials/comentarios10.JPEG";
import C11 from "../assets/testimonials/comentarios11.JPEG";
import C12 from "../assets/testimonials/comentarios12.JPEG";
import C13 from "../assets/testimonials/comentarios13.JPEG";
import C14 from "../assets/testimonials/comentarios14.JPEG";
import C15 from "../assets/testimonials/comentarios15.JPEG";
import C16 from "../assets/testimonials/comentarios16.JPEG";
import C17 from "../assets/testimonials/comentarios17.JPEG";
import C18 from "../assets/testimonials/comentarios18.JPEG";
import C19 from "../assets/testimonials/comentarios19.JPEG";
import C20 from "../assets/testimonials/comentarios20.JPEG";
import C21 from "../assets/testimonials/comentarios21.JPEG";
import C22 from "../assets/testimonials/comentarios22.JPEG";

// --- 2. ARRAY APENAS COM AS IMAGENS ---
const testimonialImages = [
  C1,
  C2,
  C3,
  C4,
  C5,
  C6,
  C7,
  C8,
  C9,
  C10,
  C11,
  C12,
  C13,
  C14,
  C15,
  C16,
  C17,
  C18,
  C19,
  C20,
  C21,
  C22,
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
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        {/* --- 3. NOVA ESTRUTURA DO SLIDE --- */}
        {/* O map agora renderiza uma imagem em cada slide */}
        <div className="flex">
          {testimonialImages.map((imgSrc, index) => (
            // Layout responsivo: 1 imagem em telas pequenas, 2 em médias, 3 em grandes
            <div
              className="flex-grow-0 flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-4"
              key={index}
            >
              <div className="bg-brand-green/20 p-2 rounded-2xl shadow-lg h-full">
                <img
                  src={imgSrc}
                  alt={`Comentário de cliente ${index + 1}`}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botões de Navegação (permanecem os mesmos) */}
      <div className="flex justify-center items-center mt-8 gap-4">
        <button
          onClick={scrollPrev}
          className="bg-brand-orange/50 hover:bg-brand-orange text-white rounded-full p-3 transition-colors duration-300"
          aria-label="Depoimento anterior"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={scrollNext}
          className="bg-brand-orange/50 hover:bg-brand-orange text-white rounded-full p-3 transition-colors duration-300"
          aria-label="Próximo depoimento"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default TestimonialsCarousel;
