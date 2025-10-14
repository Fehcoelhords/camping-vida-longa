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
      // --- CORREÇÃO AQUI ---
      // Removido h-screen e min-h fixos para permitir que o conteúdo dite a altura.
      // Adicionado py-20 para padding vertical.
      className="relative overflow-hidden py-20"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${aboutBg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          y: y,
        }}
      />
      <div className="absolute inset-0 z-10 bg-black/70"></div>

      <div className="relative z-20 h-full flex flex-col justify-center items-center text-white p-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
            <motion.div
              className="md:col-span-1 flex justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <img
                src={foundersBg}
                alt="Fundadores Bianca e Fernando"
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-2xl border-4 border-brand-orange/50"
              />
            </motion.div>

            <div className="md:col-span-2 text-center md:text-left">
              <motion.div
                className="bg-dark-bg/80 backdrop-blur-md p-8 rounded-xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6 text-brand-orange">
                  Sobre Nós
                </h2>

                <motion.p
                  className="font-sans text-main-text leading-relaxed text-lg mb-6"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {storyText.split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      variants={wordVariants}
                      className="inline-block mr-[4px]"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.p>

                <motion.p
                  className="font-heading text-xl font-semibold text-brand-orange"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, delay: 2.5 }}
                >
                  Camping Vida Longa: o lugar para se reconectar de verdade.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsSection;
