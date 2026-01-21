// pricingTiers.js
import { parseISO, differenceInCalendarDays, isValid } from "date-fns";

export const pricingTiers = [
  {
    id: "propria_individual",
    name: "Barraca Própria (Individual)",
    description: "Para 1 pessoa trazendo seu próprio equipamento.",
    pricePerPerson: 40,
    blackoutDates: [
      { start: "2025-12-28", end: "2026-01-03" },
      { start: "2026-02-13", end: "2026-02-18" },
    ],
  },
  {
    id: "propria_casal",
    name: "Barraca Própria (Casal)",
    description:
      "Para 2 pessoas trazendo seu próprio equipamento (apenas números pares de hóspedes).",
    pricePerPerson: 35, // 💰 valor atualizado — R$ 35 por pessoa/dia
    blackoutDates: [
      { start: "2025-12-28", end: "2026-01-03" },
      { start: "2026-02-13", end: "2026-02-18" },
    ],
  },
  {
    id: "alugada",
    name: "Barraca Alugada pelo Camping",
    description: "Nós fornecemos a barraca. O valor é por pessoa.",
    pricePerPerson: 50,
    blackoutDates: [
      { start: "2025-12-28", end: "2026-01-03" },
      { start: "2026-02-13", end: "2026-02-18" },
    ],
  },
  {
    id: "hostel",
    name: "Hostel",
    description:
      "Hospedagem em nosso alojamento compartilhado, com mais conforto e interação.",
    pricePerPerson: 80,
    maxGuests: 8,
    blackoutDates: [
      { start: "2025-12-25", end: "2026-01-05" },
      { start: "2026-02-13", end: "2026-02-18" },
    ],
  },
];

/* Utilitário para converter entrada em Date válida */
function toDate(input) {
  if (!input) return null;
  if (input instanceof Date) return isValid(input) ? input : null;
  if (typeof input === "string") {
    const maybeIso = parseISO(input);
    if (isValid(maybeIso)) return maybeIso;
    const d = new Date(input);
    return isValid(d) ? d : null;
  }
  return null;
}

/* Verifica se o intervalo intersecta com períodos bloqueados */
export function isDateRangeBlocked(startDate, endDate, blackoutDates = []) {
  const start = toDate(startDate);
  const end = toDate(endDate);
  if (!start || !end) return false;

  for (const b of blackoutDates || []) {
    const bs = toDate(b.start);
    const be = toDate(b.end);
    if (!bs || !be) continue;
    if (start <= be && end >= bs) return true;
  }
  return false;
}

/**
 * Calcula o valor total da reserva e gera resumo legível
 */
export function calculateTotalPrice({
  startDate,
  endDate,
  guests = 1,
  selectedTierId,
}) {
  const tier = pricingTiers.find((t) => t.id === selectedTierId);
  if (!tier) return { total: 0, details: "", error: "" };

  const start = toDate(startDate);
  const end = toDate(endDate);
  if (!start || !end) return { total: 0, details: "", error: "" };

  let nights = differenceInCalendarDays(end, start);
  if (nights <= 0) nights = 1;

  const validGuests = Number.isInteger(guests) && guests > 0 ? guests : 1;
  const pricePerPerson = Number(tier.pricePerPerson || 0);

  let total = 0;
  let details = "";
  let error = "";

  // 🔹 Regra especial para barraca de casal
  if (tier.id === "propria_casal") {
    if (validGuests % 2 !== 0) {
      error =
        "Este tipo de barraca é exclusivo para duplas 🌿 — selecione um número par de hóspedes (2, 4, 6...).";
      return { total: 0, details, error };
    }

    total = pricePerPerson * validGuests * nights;
    details = `Barraca Própria (Casal) — ${validGuests} hóspede(s) (em ${
      validGuests / 2
    } barraca(s) de casal). Valor por pessoa: R$${pricePerPerson.toFixed(
      2
    )}/dia.`;
  } else {
    total = pricePerPerson * nights * validGuests;
    details = `${
      tier.name
    } — ${validGuests} hóspede(s), R$${pricePerPerson.toFixed(2)}/dia.`;
  }

  return {
    total,
    details,
    nights,
    error,
  };
}

/* ---------------------------
   Testes rápidos
   --------------------------- */

// 1️⃣ Barraca Alugada — 1 pessoa, 7 dias
console.log(
  calculateTotalPrice({
    startDate: "2025-11-06",
    endDate: "2025-11-13",
    guests: 1,
    selectedTierId: "alugada",
  })
);

// 2️⃣ Barraca Casal — 4 pessoas (2 barracas), 4 noites
console.log(
  calculateTotalPrice({
    startDate: "2025-12-30",
    endDate: "2026-01-03",
    guests: 4,
    selectedTierId: "propria_casal",
  })
);

// 3️⃣ Barraca Casal — número ímpar de hóspedes (erro esperado)
console.log(
  calculateTotalPrice({
    startDate: "2025-12-30",
    endDate: "2026-01-03",
    guests: 3,
    selectedTierId: "propria_casal",
  })
);

// 4️⃣ Hostel — 3 pessoas, 2 noites
console.log(
  calculateTotalPrice({
    startDate: "2025-11-10",
    endDate: "2025-11-12",
    guests: 3,
    selectedTierId: "hostel",
  })
);

export default {
  pricingTiers,
  calculateTotalPrice,
  isDateRangeBlocked,
};
