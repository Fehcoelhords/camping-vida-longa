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
  {
    id: "hostel",
    name: "Hostel",
    description:
      "Hospedagem em nosso alojamento compartilhado, com mais conforto e interação.",
    price: 80,
    type: "per_person",
    maxGuests: 8,
    // --- NOVA REGRA ADICIONADA ---
    // Datas em formato ANO-MÊS-DIA
    blackoutDates: [
      { start: "2025-12-25", end: "2026-01-05" },
      // Podemos adicionar mais intervalos aqui no futuro, ex:
      // { start: '2026-02-14', end: '2026-02-18' }
    ],
  },
];
