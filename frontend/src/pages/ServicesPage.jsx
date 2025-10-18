import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Imagens
import campingAreaImg from "../assets/service-details/camping-tradicional/camping-area.jpg";
import campfireImg from "../assets/service-details/camping-tradicional/campfire-leisure.jpg";
import areaExterna2Img from "../assets/service-details/camping-tradicional/area-externa2.jpg";
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

// --- CORREÇÃO AQUI: Extensões trocadas para .jpg minúsculo ---
import hostelEntrada1 from "../assets/service-details/hostel/entrada-do-hostel.jpg";
import hostelTodasAsCamas from "../assets/service-details/hostel/todas-as-camas.jpg";
import hostelEspacoInterno from "../assets/service-details/hostel/espaço-interno-hostel.jpg";
import hostelFrente33 from "../assets/service-details/hostel/frente-hostel33.jpg";
import hostelBanheiro from "../assets/service-details/hostel/hostel-banheiro.jpg";
import hostelBanheiro12 from "../assets/service-details/hostel/hostel-banheiro12.jpg";
import hostelPiaLado1 from "../assets/service-details/hostel/pia-lado1.jpg";
import hostelPiaLado2 from "../assets/service-details/hostel/pia-lado2.jpg";
import hostelAviso from "../assets/service-details/hostel/aviso.jpg";

const servicesPageData = {
  camping: {
    /* ... Conteúdo do Camping ... */
  },
  hostel: {
    pageTitle: "Hostel",
    features: [
      {
        title: "Recepção e Entrada",
        description: "Nossa recepção do hostel é o seu ponto de partida...",
        image: hostelEntrada1,
      },
      {
        title: "Dormitórios Confortáveis",
        description: "Oferecemos camas confortáveis em dormitórios...",
        image: hostelTodasAsCamas,
      },
      {
        title: "Área de Convivência",
        description: "Um espaço para relaxar, ler um livro ou socializar...",
        image: hostelEspacoInterno,
      },
    ],
    // Galeria do Hostel com as variáveis corrigidas
    galleryImages: [
      hostelFrente33,
      hostelBanheiro,
      hostelBanheiro12,
      hostelPiaLado1,
      hostelPiaLado2,
      hostelAviso,
    ],
  },
  // ... (resto do servicesPageData com os outros serviços)
};
// ... (resto do código que você já tem)
