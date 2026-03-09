/**
 * Couples Pricing Logic
 * Centralized pricing calculations for individual and couples plans
 * Implements COUP-01 (couples pricing) and PRICE-02/PRICE-05 (couples toggle)
 */

export type ProductId = 'will' | 'trust' | 'estate-plan' | 'poa' | 'healthcare-directive'

export interface ProductPricing {
  id: ProductId
  name: string
  individualPrice: number
  couplesPrice: number
  couplesSurcharge: number
  supportsCouple: boolean
}

/**
 * Product pricing configuration
 * Couples add $100 to will, trust, and estate-plan
 */
export const productPricing: Record<string, ProductPricing> = {
  will: {
    id: 'will',
    name: 'Last Will & Testament',
    individualPrice: 199,
    couplesPrice: 299,
    couplesSurcharge: 100,
    supportsCouple: true,
  },
  trust: {
    id: 'trust',
    name: 'Living Trust',
    individualPrice: 599,
    couplesPrice: 699,
    couplesSurcharge: 100,
    supportsCouple: true,
  },
  'estate-plan': {
    id: 'estate-plan',
    name: 'Complete Estate Plan',
    individualPrice: 699,
    couplesPrice: 799,
    couplesSurcharge: 100,
    supportsCouple: true,
  },
  poa: {
    id: 'poa',
    name: 'Power of Attorney',
    individualPrice: 149,
    couplesPrice: 249,
    couplesSurcharge: 100,
    supportsCouple: true,
  },
  'healthcare-directive': {
    id: 'healthcare-directive',
    name: 'Healthcare Directive',
    individualPrice: 99,
    couplesPrice: 199,
    couplesSurcharge: 100,
    supportsCouple: true,
  },
}

/**
 * Get the price for a product based on whether it's a couples plan
 */
export function getProductPrice(productId: string, isCouples: boolean): number {
  const pricing = productPricing[productId]
  if (!pricing) return 0
  return isCouples ? pricing.couplesPrice : pricing.individualPrice
}

/**
 * Get the couples surcharge for a product
 */
export function getCouplesSurcharge(productId: string): number {
  const pricing = productPricing[productId]
  return pricing?.couplesSurcharge ?? 100
}

/**
 * Check if a product supports couples pricing
 */
export function supportsCouplesPricing(productId: string): boolean {
  const pricing = productPricing[productId]
  return pricing?.supportsCouple ?? false
}

/**
 * Format price for display
 */
export function formatPrice(cents: number): string {
  return `$${cents}`
}

/**
 * What's included in a couples plan
 */
export const couplesFeatures = [
  'Two complete, customized document sets',
  'Mirror documents for both partners',
  'Shared account access',
  'Partner invitation & permissions',
  'Coordinated estate planning',
]
