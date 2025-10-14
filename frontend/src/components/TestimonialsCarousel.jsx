import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import TestimonialCard from "./TestimonialCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Dados dos depoimentos (podemos mover para outro lugar no futuro, mas por enquanto fica aqui)
const testimonialsData = [
  {
    quote:
      "Uma experiência verdadeiramente mágica. As cabanas são confortáveis e a vista das estrelas é algo que nunca esqueceremos. Mal posso esperar para voltar!",
    author: "Mariana Silva",
    location: "São Paulo, SP",
  },
  {
    quote:
      "O lugar perfeito para desligar da cidade. As trilhas são bem cuidadas e a equipe é extremamente atenciosa. Recomendo para qualquer um que precise recarregar as energias.",
    author: "Rafael Costa",
    location: "Rio de Janeiro, RJ",
  },
  {
    quote:
      "Fui com meus filhos e eles amaram. A segurança é ótima e as atividades de recreação são um diferencial. O café da manhã com produtos locais é delicioso!",
    author: "Família Oliveira",
    location: "Belo Horizonte, MG",
  },
  {
    quote:
      "Como fotógrafo da natureza, encontrei um paraíso. Cada canto do camping é um cartão postal. A paz e o silêncio são revigorantes. Voltarei com certeza.",
    author: "Júlio Andrade",
    location: "Curitiba, PR",
  },
];

function TestimonialsCarousel() {
  // O hook 'useEmblaCarousel' nos dá o controle do carrossel.
  // { loop: true } faz com que ele seja infinito.
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  // Funções para rolar para o slide anterior e próximo
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* O 'emblaRef' é a referência que a biblioteca usa para identificar o carrossel */}
      <div className="overflow-hidden" ref={emblaRef}>
        {/* Container dos slides */}
        <div className="flex">
          {testimonialsData.map((testimonial, index) => (
            // Cada slide ocupa o espaço de 1, 2 ou 3 por tela, dependendo do tamanho
            <div
              className="flex-grow-0 flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
              key={index}
            >
              <TestimonialCard
                quote={testimonial.quote}
                author={testimonial.author}
                location={testimonial.location}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Botões de Navegação */}
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
