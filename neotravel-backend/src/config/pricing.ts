/**
 * Grille tarifaire forfaitaire
 * Jusqu'à 180 km
 */
export const PRICE_GRID = [
  { km: 10, price: 250 },
  { km: 20, price: 250 },
  { km: 30, price: 250 },
  { km: 40, price: 320 },
  { km: 50, price: 350 },
  { km: 60, price: 390 },
  { km: 70, price: 430 },
  { km: 80, price: 500 },
  { km: 90, price: 540 },
  { km: 100, price: 580 },
  { km: 110, price: 620 },
  { km: 120, price: 660 },
  { km: 130, price: 700 },
  { km: 140, price: 740 },
  { km: 150, price: 780 },
  { km: 160, price: 820 },
  { km: 170, price: 860 },
  { km: 180, price: 900 },
];

/**
 * Prix par kilomètre au-delà de 180 km
 */
export const PRICE_PER_KM = 2.5;

/**
 * Marge appliquée en fin de calcul
 */
export const MARGIN = 0.15;

/**
 * Coefficients de saisonnalité
 * Le mois correspond au numéro JavaScript :
 * Janvier = 1, Décembre = 12
 */
export const SEASON_COEFFICIENTS = {
  1: -0.07, // Janvier
  2: -0.07, // Février
  3: 0.10,  // Mars
  4: 0.10,  // Avril
  5: 0.15,  // Mai
  6: 0.15,  // Juin
  7: 0.10,  // Juillet
  8: -0.07, // Août
  9: 0,     // Septembre
  10: 0,    // Octobre
  11: -0.07,// Novembre
  12: 0,    // Décembre
};

/**
 * Coefficients selon le nombre de passagers
 */
export const CAPACITY_COEFFICIENTS = [
  {
    min: 1,
    max: 19,
    coefficient: -0.05,
  },
  {
    min: 20,
    max: 53,
    coefficient: 0,
  },
  {
    min: 54,
    max: 63,
    coefficient: 0.15,
  },
  {
    min: 64,
    max: 67,
    coefficient: 0.20,
  },
  {
    min: 68,
    max: 85,
    coefficient: 0.40,
  },
];

/**
 * Plus de 85 passagers
 * => Traitement manuel
 */
export const MAX_AUTO_PASSENGERS = 85;