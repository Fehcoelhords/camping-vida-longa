// Este arquivo define os diferentes tipos de reserva disponíveis.

export const pricingTiers = [
  {
    id: "propria_individual",
    name: "Barraca Própria (Individual)",
    description: "Para 1 pessoa trazendo seu próprio equipamento.",
    price: 40,
    type: "fixed",
    baseGuests: 1,
  },
  {
    id: "propria_casal",
    name: "Barraca Própria (Casal)",
    description: "Para 2 pessoas trazendo seu próprio equipamento.",
    price: 70,
    type: "fixed",
    baseGuests: 2,
  },
  {
    id: "alugada",
    name: "Barraca Alugada pelo Camping",
    description: "Nós fornecemos a barraca. O valor é por pessoa.",
    price: 50,
    type: "per_person",
  },
  // --- MUDANÇAS APLICADAS AQUI ---
  {
    id: "hostel", // ID atualizado
    name: "Hostel", // Nome atualizado
    description:
      "Hospedagem em nosso alojamento compartilhado, com mais conforto e interação.",
    price: 80, // Mantive o preço de 80, ajuste se necessário
    type: "per_person",
    maxGuests: 8, // Nova regra de negócio: máximo de 8 hóspedes
  },
];
