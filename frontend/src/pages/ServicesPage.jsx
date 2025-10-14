import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Imagens
import campingAreaImg from "../assets/service-details/camping-tradicional/camping-area.jpg";
import campfireImg from "../assets/service-details/camping-tradicional/campfire-leisure.jpg";

import cabanaDetail1 from "../assets/services/cabanas/cabana-detalhe-1.jpg";
import cabanaDetail2 from "../assets/services/cabanas/cabana-detalhe-2.jpg";
import cabanaDetail3 from "../assets/services/cabanas/cabana-detalhe-3.jpg";
import refeicoesDetail1 from "../assets/services/refeicoes/refeicao-detalhe-1.jpg";
import refeicoesDetail2 from "../assets/services/refeicoes/refeicao-detalhe-2.jpg";
import refeicoesDetail3 from "../assets/services/refeicoes/refeicao-detalhe-3.jpg";
import passeiosDetail1 from "../assets/services/passeios/passeio-detalhe-1.jpg";
import passeiosDetail2 from "../assets/services/passeios/passeio-detalhe-2.jpg";
import passeiosDetail3 from "../assets/services/passeios/passeio-detalhe-3.jpg";
import passeiosDetail4 from "../assets/services/passeios/passeio-detalhe-4.jpg";
import hostelEntrada1 from "../assets/service-details/hostel/entrada-do-hostel.jpg";
import hostelTodasAsCamas from "../assets/service-details/hostel/todas-as-camas.jpg";
import hostelEspacoInterno from "../assets/service-details/hostel/espaço-interno-hostel.jpg";
import hostelFrente33 from "../assets/service-details/hostel/frente-hostel33.JPG";
import hostelBanheiro from "../assets/service-details/hostel/hostel-banheiro.JPG";
import hostelBanheiro12 from "../assets/service-details/hostel/hostel-banheiro12.JPG";
import hostelPiaLado1 from "../assets/service-details/hostel/pia-lado1.JPG";
import hostelPiaLado2 from "../assets/service-details/hostel/pia-lado2.JPG";
import hostelAviso from "../assets/service-details/hostel/aviso.JPG";
import areaExterna2Img from "../assets/service-details/camping-tradicional/area-externa2.jpg";

const servicesPageData = {
  camping: {
    pageTitle: "Camping",
    features: [
      {
        title: "Área para Barracas",
        description:
          "Oferecemos um espaço amplo e gramado, cercado por árvores nativas, garantindo privacidade e contato direto com a natureza. Cada lote é pensado para sua comodidade, com fácil acesso aos pontos de água e eletricidade.",
        image: campingAreaImg,
      },
      {
        title: "Lazer & Fogueira",
        description:
          "Nossa área de lazer central é o coração do camping. Ao anoitecer, acendemos uma grande fogueira comunitária, o lugar perfeito para relaxar, compartilhar histórias e observar as estrelas.",
        image: campfireImg,
      },
      {
        title: "Área Externa",
        description:
          "Nosso espaço de camping conta com uma linda vista coberta de natureza e de fácil acesso aos banheiros, área de lazer e área de refeição.",
        image: areaExterna2Img,
      },
    ],
    galleryImages: [
      campingAreaImg,
      campfireImg,
      areaExterna2Img,
      cabanaDetail1,
    ],
  },
  hostel: {
    pageTitle: "Hostel",
    features: [
      {
        title: "Recepção e Entrada",
        description:
          "Nossa recepção do hostel é o seu ponto de partida para a aventura. Um espaço integrado à natureza, onde você pode relaxar, planejar seus passeios e conhecer outros viajantes.",
        image: hostelEntrada1,
      },
      {
        title: "Dormitórios Confortáveis",
        description:
          "Oferecemos camas confortáveis em dormitórios compartilhados, equipados com armários individuais e pontos de luz/energia. A solução ideal para quem viaja sozinho ou com amigos.",
        image: hostelTodasAsCamas,
      },
      {
        title: "Área de Convivência",
        description:
          "Um espaço para relaxar, ler um livro ou socializar. Nossa área comum é projetada para promover a interação e a troca de experiências em um ambiente descontraído.",
        image: hostelEspacoInterno,
      },
    ],
    galleryImages: [
      hostelFrente33,
      hostelBanheiro,
      hostelBanheiro12,
      hostelPiaLado1,
      hostelPiaLado2,
      hostelAviso,
    ],
  },
  refeicoes: {
    pageTitle: "Refeições",
    features: [
      {
        title: "Café da Manhã Campestre",
        description:
          "Comece seu dia com energia. Servimos um café da manhã completo com pães frescos, frutas da estação, queijos locais e um café coado na hora, tudo apreciando a vista para a mata.",
        image: refeicoesDetail1,
      },
      {
        title: "Jantares Temáticos",
        description:
          "À noite, nosso espaço ganha vida com jantares temáticos ao redor da fogueira. Desfrute de noites de pizza, churrascos ou pratos caseiros preparados com ingredientes da nossa horta orgânica.",
        image: refeicoesDetail2,
      },
      {
        title: "Cestas de Piquenique",
        description:
          "Quer explorar uma trilha ou passar a tarde no lago? Preparamos cestas de piquenique personalizadas com sanduíches, frutas, bebidas e doces para você levar em suas aventuras.",
        image: refeicoesDetail3,
      },
    ],
  },
  passeios: {
    pageTitle: "Passeios",
    features: [
      {
        title: "Trilhas e Cachoeiras",
        description:
          "Explore quilômetros de trilhas sinalizadas que cortam a Mata Atlântica e levam a cachoeiras de água cristalina. Uma aventura para todos os níveis de preparo físico.",
        image: passeiosDetail3,
      },
      {
        title: "Caiaque no Lago",
        description:
          "Alugue um de nossos caiaques e desfrute da tranquilidade do nosso lago privado. Reme no seu próprio ritmo, observe os pássaros e sinta a paz da água.",
        image: passeiosDetail2,
      },
      {
        title: "Passeios de Barco",
        description:
          "Descubra as praias e ilhas paradisíacas ao redor do nosso camping. Oferecemos passeios de barco com marinheiros locais para uma experiência autêntica e inesquecível.",
        image: passeiosDetail1,
      },
    ],
    galleryImages: [
      passeiosDetail1,
      passeiosDetail2,
      passeiosDetail3,
      passeiosDetail4,
    ],
  },
};

function ServicesPage() {
  const [activeService, setActiveService] = useState("camping");
  const [selectedImage, setSelectedImage] = useState(null);
  const currentService = servicesPageData[activeService];

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading text-brand-orange mb-4">
            Nossos Serviços
          </h1>
          <p className="text-lg text-secondary-text">
            Conheça em detalhes cada experiência que o Camping Vida Longa
            oferece.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-4 mb-16">
          {["camping", "hostel", "refeicoes", "passeios"].map((key) => (
            <button
              key={key}
              onClick={() => setActiveService(key)}
              className={`font-heading font-semibold py-2 px-6 rounded-full transition-colors duration-300 ${
                activeService === key
                  ? "bg-brand-orange text-white"
                  : "bg-brand-green/20 hover:bg-brand-green/40 text-secondary-text"
              }`}
            >
              {servicesPageData[key].pageTitle}
            </button>
          ))}
        </div>

        {currentService && (
          <motion.div
            key={activeService}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-20"
          >
            {currentService.features.map((feature, index) => (
              <motion.div
                key={index}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div
                  className={`w-full aspect-video rounded-2xl overflow-hidden shadow-lg ${
                    index % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover object-[center_70%]"
                  />
                </div>
                <div
                  className={`text-center md:text-left ${
                    index % 2 === 1 ? "md:order-1" : ""
                  }`}
                >
                  <h3 className="text-3xl font-heading text-brand-orange mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-text leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {currentService.galleryImages && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <h4 className="text-3xl font-heading text-center mb-8">
                  Galeria de Fotos - {currentService.pageTitle}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {currentService.galleryImages.map((image, index) => (
                    <motion.div
                      key={index}
                      className="aspect-square rounded-lg overflow-hidden cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image}
                        alt={`Galeria ${currentService.pageTitle} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center"
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={selectedImage}
              alt="Visualização ampliada"
              className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              transition={{ type: "spring", stiffness: 120 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ServicesPage;
