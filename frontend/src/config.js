// Este arquivo define os diferentes tipos de reserva disponíveis.
// Adicionamos um 'type' para diferenciar o cálculo e um 'baseGuests' para os preços fixos.

export const pricingTiers = [
  {
    id: "propria_individual",
    name: "Barraca Própria (Individual)",
    description: "Para 1 pessoa trazendo seu próprio equipamento.",
    price: 40, // Preço fixo da diária
    type: "fixed", // Tipo de cálculo
    baseGuests: 1, // Número de hóspedes base para este preço
  },
  {
    id: "propria_casal",
    name: "Barraca Própria (Casal)",
    description: "Para 2 pessoas trazendo seu próprio equipamento.",
    price: 70, // Preço fixo da diária
    type: "fixed",
    baseGuests: 2,
  },
  {
    id: "alugada",
    name: "Barraca Alugada pelo Camping",
    description: "Nós fornecemos a barraca. O valor é por pessoa.",
    price: 50, // Preço por pessoa da diária
    type: "per_person",
  },
  // Mantive a opção de Cabana que tínhamos antes.
  // Se não quiser usá-la, podemos remover este bloco de código depois.
  {
    id: "cabana",
    name: "Cabana da Floresta",
    description: "Hospedagem em nossas cabanas com mais conforto.",
    price: 80, // Preço por pessoa da diária
    type: "per_person",
  },
];
