import React, { useState } from "react";

// Componentes
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import AboutUsSection from "../components/AboutUsSection";
import ServiceCard from "../components/ServiceCard";
import ServiceModal from "../components/ServiceModal";
import TestimonialsCarousel from "../components/TestimonialsCarousel";

// Imagens
import imgServicoCabanas from "../assets/services/servico-cabanas.jpg";
import imgServicoHostel from "../assets/service-details/hostel/entrada-do-hostel.jpg";
import imgServicoRefeicoes from "../assets/services/servico-refeicoes.png";
import imgServicoPasseios from "../assets/services/servico-passeios.jpg";
// Imagens de detalhe
import cabanaDetail1 from "../assets/services/cabanas/cabana-detalhe-1.jpg";
import cabanaDetail2 from "../assets/services/cabanas/cabana-detalhe-2.jpg";
import cabanaDetail3 from "../assets/services/cabanas/cabana-detalhe-3.jpg";
import cabanaDetail4 from "../assets/services/cabanas/cabana-detalhe-4.jpg";
import hostelEntrada1 from "../assets/service-details/hostel/entrada-do-hostel.jpg";
import hostelTodasAsCamas from "../assets/service-details/hostel/todas-as-camas.jpg";
import hostelEspacoInterno from "../assets/service-details/hostel/espaço-interno-hostel.jpg";
import hostelCamas1 from "../assets/service-details/hostel/camas-hostel1.jpg";
import refeicoesDetail1 from "../assets/services/refeicoes/refeicao-detalhe-1.jpg";
import refeicoesDetail2 from "../assets/services/refeicoes/refeicao-detalhe-2.jpg";
import refeicoesDetail3 from "../assets/services/refeicoes/refeicao-detalhe-3.jpg";
import passeiosDetail1 from "../assets/services/passeios/passeio-detalhe-1.jpg";
import passeiosDetail2 from "../assets/services/passeios/passeio-detalhe-2.jpg";
import passeiosDetail3 from "../assets/services/passeios/passeio-detalhe-3.jpg";
import passeiosDetail4 from "../assets/services/passeios/passeio-detalhe-4.jpg";

// Dados dos serviços para o modal
const servicesData = [
  {
    id: "cabanas",
    title: "Camping",
    mainImage: imgServicoCabanas,
    // --- DESCRIÇÃO ATUALIZADA ---
    description: `Conforto, Natureza e Conexão em um Só Lugar\n\nSe você busca um refúgio tranquilo para se desconectar da rotina e se reconectar com o que realmente importa, nossa área de camping em meio à floresta é o destino ideal.\n\n🌿 Um espaço pensado para famílias, casais e grupos de amigos que desejam curtir a natureza com conforto, segurança e praticidade.\n\n🌟 O que você encontra aqui:\n✔️ Espaço para sua barraca (ou alugue uma conosco!)\n✔️ Banheiros compartilhados sempre limpos\n✔️ Cozinha comunitária com utensílios, fogão e geladeira\n✔️ Ambiente seguro e acolhedor, rodeado por trilhas e sons da natureza\n✔️ Espaço para fogueira, descanso e convivência`,
    images: [cabanaDetail1, cabanaDetail2, cabanaDetail3, cabanaDetail4],
  },
  {
    id: "hostel",
    title: "Hostel",
    mainImage: imgServicoHostel,
    // --- DESCRIÇÃO ATUALIZADA ---
    description: `Seu Cantinho Aconchegante para Novas Experiências\n\nProcurando um lugar tranquilo, acolhedor e com aquele clima gostoso de casa compartilhada? Nosso hostel foi pensado para quem valoriza boas conversas, novas amizades e momentos leves.\n\n✨ Com capacidade para até 8 pessoas, oferecemos um ambiente descontraído, organizado e ideal para viajantes solo, grupos pequenos ou quem ama conhecer gente nova.\n\nAqui, você encontra mais do que uma cama confortável. Encontra histórias, conexões e amizades que podem durar uma vida inteira.\n\nSeja para um fim de semana, uma temporada mais longa ou uma parada estratégica em sua viagem, o nosso hostel é aquele tipo de lugar que faz você se sentir em casa — mesmo longe dela.`,
    images: [
      hostelEntrada1,
      hostelTodasAsCamas,
      hostelEspacoInterno,
      hostelCamas1,
    ],
  },
  {
    id: "refeicoes",
    title: "Refeições",
    mainImage: imgServicoRefeicoes,
    // --- DESCRIÇÃO ATUALIZADA ---
    description: `Sabores que Aconchegam\n\nAqui, cada refeição é pensada para fazer você se sentir em casa — com cheirinho de comida boa no ar e muito sabor em cada detalhe.\n\nComece o dia com carinho com nosso delicioso café da manhã, com destaque para o nosso pão caseiro, feito com muito amor. Um convite para sentar, apreciar a natureza, se saborear e começar o dia com calma e energia boa.\n\nQuando o sol se põe, o aroma irresistível de pizza artesanal toma conta do ambiente. A partir das 18h, servimos pizzas feitas com massa artesanal e ingredientes frescos escolhidos a dedo. Escolha entre opções clássicas ou surpreenda-se com combinações criativas — temos alternativas para todos os gostos, inclusive vegetarianas.`,
    images: [refeicoesDetail1, refeicoesDetail2, refeicoesDetail3],
  },
  {
    id: "passeios",
    title: "Passeios",
    mainImage: imgServicoPasseios,
    // --- DESCRIÇÃO ATUALIZADA ---
    description: `Explore o Paraíso com a Gente!\n\nPraias cristalinas, natureza preservada e roteiros que só quem conhece bem pode te mostrar.\n\nDescubra os encantos de Ilha Grande com nossos passeios especialmente pensados para quem quer viver uma experiência autêntica, segura e inesquecível. Seja por mar ou por terra, você vai se surpreender com paisagens de tirar o fôlego e lugares que poucos têm o privilégio de conhecer.\n\nSeja você aventureiro, amante da natureza ou apenas alguém em busca de paz, temos o roteiro ideal para tornar sua visita à Ilha Grande ainda mais especial.`,
    images: [
      passeiosDetail1,
      passeiosDetail2,
      passeiosDetail3,
      passeiosDetail4,
    ],
  },
];

function HomePage() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <>
      <HeroSection />

      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-center mb-16">
            Conheça Nosso{" "}
            <span className="text-brand-orange">Camping e Serviços</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesData.map((service) => (
              <ServiceCard
                key={service.id}
                image={service.mainImage}
                title={service.title}
                onClick={() => setSelectedService(service)}
              />
            ))}
          </div>
        </div>
      </section>

      <AboutUsSection />

      <section className="py-20 px-4 md:px-8 bg-dark-bg">
        <div className="container mx-auto">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-center mb-16">
            O Que Nossos{" "}
            <span className="text-brand-orange">Visitantes Dizem</span>
          </h2>
          <TestimonialsCarousel />
        </div>
      </section>

      <ServiceModal
        show={!!selectedService}
        onClose={() => setSelectedService(null)}
        serviceData={selectedService}
      />
    </>
  );
}

export default HomePage;
