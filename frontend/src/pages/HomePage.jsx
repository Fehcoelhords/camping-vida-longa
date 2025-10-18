import React, { useState } from "react";

// Componentes
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import AboutUsSection from "../components/AboutUsSection";
import ServiceCard from "../components/ServiceCard";
import ServiceModal from "../components/ServiceModal";
import TestimonialsCarousel from "../components/TestimonialsCarousel";

// Imagens dos Serviços (principais)
import imgServicoCabanas from "../assets/services/servico-cabanas.jpg";
import imgServicoHostel from "../assets/service-details/hostel/entrada-do-hostel.jpg";
import imgServicoRefeicoes from "../assets/services/servico-refeicoes.png";
import imgServicoPasseios from "../assets/services/servico-passeios.jpg";

// Imagens de detalhe para os modais
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
    title: "Cabanas",
    mainImage: imgServicoCabanas,
    description:
      "Nossas cabanas de madeira oferecem o equilíbrio perfeito entre o charme rústico e o conforto moderno. Cada unidade conta com camas confortáveis, banheiro privativo com água quente, uma pequena cozinha e uma varanda com vista para a floresta. Ideal para casais ou famílias pequenas que buscam uma imersão na natureza sem abrir mão do aconchego.",
    images: [cabanaDetail1, cabanaDetail2, cabanaDetail3, cabanaDetail4],
  },
  {
    id: "hostel",
    title: "Hostel",
    mainImage: imgServicoHostel,
    description:
      "Para quem prefere a comodidade de uma estrutura central e a oportunidade de conhecer outros viajantes, nossos quartos no hostel principal são a escolha ideal. Com acesso fácil ao restaurante e áreas comuns, os quartos são espaçosos, bem decorados e garantem uma noite de sono tranquila após um dia de aventuras.",
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
    description:
      "Oferecemos um delicioso café da manhã com produtos locais e frescos para começar bem o seu dia. Para o jantar, nosso restaurante serve pratos caseiros e saborosos. Também preparamos cestas de piquenique e kits para churrasco para você aproveitar ao máximo sua experiência ao ar livre.",
    images: [refeicoesDetail1, refeicoesDetail2, refeicoesDetail3],
  },
  {
    id: "passeios",
    title: "Passeios",
    mainImage: imgServicoPasseios,
    description:
      "A aventura espera por você! Oferecemos passeios guiados por trilhas que levam a cachoeiras secretas, aluguel de caiaques para explorar nosso lago cristalino e passeios noturnos para observação de estrelas. Nossos guias experientes garantem uma experiência segura e inesquecível.",
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
