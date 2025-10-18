import React from "react";
import { motion } from "framer-motion";
import BookingForm from "../components/BookingForm";
import paymentImage from "../assets/payment-info.png";
import { FaHeart, FaCreditCard, FaUserFriends } from "react-icons/fa";

function ReservationsPage() {
  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-heading text-brand-orange mb-4">
          Garanta sua Vaga no Paraíso
        </h1>
        <p className="text-lg text-secondary-text mb-12">
          Selecione as datas, o número de hóspedes e o tipo de acomodação
          desejada. Estamos ansiosos para receber você!
        </p>
      </div>

      <BookingForm />

      {/* --- SEÇÃO DE PAGAMENTO COM NOVO DESIGN DE MOLDURA --- */}
      <section className="mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Coluna da Imagem com Moldura em Camadas e Animação */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, x: -100, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            whileHover={{
              scale: 1.05,
              rotate: -2,
              transition: { type: "spring", stiffness: 300 },
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
          >
            {/* Moldura Externa */}
            <div className="bg-brand-green/20 p-3 rounded-2xl shadow-2xl">
              <img
                src={paymentImage}
                alt="Recepção do Camping Vida Longa"
                // Usamos 'object-cover' para preencher e 'aspect-video' para dar uma proporção boa
                className="w-full h-full object-cover rounded-lg aspect-video"
              />
            </div>
          </motion.div>

          {/* Coluna do Texto */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 50, delay: 0.4 }}
          >
            <h2 className="text-3xl font-heading text-main-text mb-6">
              Pagamento e <span className="text-brand-orange">Confirmação</span>
            </h2>
            <div className="space-y-4 text-secondary-text text-lg">
              <p>
                Para proporcionar uma experiência mais humanizada e pessoal, a
                garantia da sua vaga é feita com um sinal de 50% após a
                solicitação da reserva. Fique tranquilo, o processo é pensado
                para sua total segurança: não é necessário adicionar nenhum
                cartão de crédito em nosso site.
              </p>
              <p>
                O pagamento é feito via Pix e você receberá por e-mail todas as
                instruções detalhadas, junto com seu código de reserva
                exclusivo.
              </p>
              <p>
                Nossos anfitriões, Bianca e Fernando, estarão à sua espera para
                dar as boas-vindas.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default ReservationsPage;
