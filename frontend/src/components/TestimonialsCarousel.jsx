import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// --- CORREÇÃO AQUI: Extensões trocadas para .jpeg minúsculo ---
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
        <div className="flex">
          {testimonialImages.map((imgSrc, index) => (
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
