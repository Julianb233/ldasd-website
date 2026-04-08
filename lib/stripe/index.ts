// Re-export from client.ts for backward compatibility
export { stripe, getStripe } from './client'
export { STRIPE_PRICES, DISPLAY_PRICES, PRODUCT_NAMES, formatPrice, getDisplayPrice, hasCouplesPricing } from './products'
export type { ProductType, PricingTier } from './products'
