import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import aboutBg from "../assets/about-background.png";
import foundersBg from "../assets/founders.jpg";

function AboutUsSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "10%"]);

  const storyText =
    "O Camping Vida Longa foi criado por BIANCA E FERNANDO, um casal de moradores de Ilha Grande, localizada no estado do Rio de Janeiro. O camping tem como filosofia sempre respeitar e aproveitar do melhor que a natureza tem a oferecer. O Camping Vida Longa surgiu exatamente para oferecer esse conforto de estadia para todos os nossos visitantes. Contamos com suporte de locomoção para deixar a sua experiência ainda mais completa e tranquila. Seja explorando trilhas que revelam cachoeiras escondidas ou participando de nossas noites de fogueira sob um céu incrivelmente estrelado, cada momento aqui é uma oportunidade para viver essa experiência única e renovadora.";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Background Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: y }}
      >
        <img
          src={aboutBg}
          alt="Background Natureza"
          loading="lazy"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/90 via-dark-bg/70 to-dark-bg/95"></div>
      </motion.div>

      <div className="relative z-20 container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Coluna da Imagem */}
          <motion.div
            className="relative group perspective-1000"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            {/* Elemento Decorativo de Fundo */}
            <div className="absolute -inset-4 bg-brand-orange/20 rounded-2xl transform rotate-3 scale-105 blur-lg transition-all duration-500 group-hover:rotate-6 group-hover:bg-brand-orange/30"></div>
            
            {/* Foto Principal estilo "Polaroid Moderno" */}
            <div className="relative bg-white/5 p-2 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm">
              <div className="overflow-hidden rounded-xl aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
                <img
                  src={foundersBg}
                  alt="Fundadores do Camping"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md rounded-xl text-center border border-white/10">
                <span className="block font-heading text-xl md:text-2xl text-white font-bold tracking-wide">
                  Bianca & Fernando
                </span>
                <span className="block font-sans text-brand-orange text-sm uppercase tracking-widest mt-1">
                  Fundadores & Anfitriões
                </span>
              </div>
            </div>
          </motion.div>

          {/* Coluna do Texto */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Título com Destaque */}
              <div className="mb-8 border-l-4 border-brand-orange pl-6">
                <span className="block text-brand-orange font-sans font-bold uppercase tracking-widest text-sm mb-2">
                  Nossa História
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-tight">
                  <span className="text-white/40 block text-2xl md:text-3xl mb-1 font-semibold">Do amor pela natureza,</span>
                  Nasceu o nosso refúgio.
                </h2>
              </div>

              {/* Texto com Glassmorphism e Ícone */}
              <div className="bg-brand-green/10 border border-brand-green/20 backdrop-blur-md rounded-2xl p-8 relative overflow-hidden group">
                {/* Efeito Glow no Hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:bg-brand-orange/20"></div>

                <div className="relative z-10 space-y-6 text-lg text-main-text/90 font-sans leading-relaxed">
                  <p>
                    Somos um casal apaixonado por Ilha Grande e por tudo que ela representa. O <strong className="text-brand-orange">Camping Vida Longa</strong> é a materialização do nosso sonho de compartilhar esse pedaço de paraíso com o mundo.
                  </p>
                  <p>
                    Nossa filosofia é simples: <em className="text-white">respeito máximo à natureza</em> e acolhimento genuíno. Queremos que você não apenas visite, mas que se sinta parte deste ecossistema vibrante.
                  </p>
                  <p>
                    Oferecemos suporte completo de locomoção e dicas exclusivas de quem vive aqui, para você curtir desde as cachoeiras escondidas até as noites estreladas ao redor da fogueira, com todo o conforto e segurança.
                  </p>
                </div>
              </div>

              {/* Frase de Efeito Final */}
              <motion.div 
                className="mt-8 flex items-center md:justify-end gap-3 text-brand-orange/80"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="h-px bg-brand-orange/50 w-12 md:w-24"></div>
                <span className="font-heading font-semibold text-lg italic">
                  Para viver o extraordinário.
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsSection;
