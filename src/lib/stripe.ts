import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(secretKey: string): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(secretKey, {
      httpClient: Stripe.createFetchHttpClient(),
    });
  }
  return _stripe;
}

export const PRICE_LOOKUP: Record<string, { amount: number; name: string; productId: string }> = {
  pro: { 
    amount: 5000, 
    name: 'Pro', 
    productId: import.meta.env.STRIPE_PRO_PRODUCT_ID || 'prod_UhYgDxRajiLam3' 
  },
  lifetime: { 
    amount: 12000, 
    name: 'Lifetime', 
    productId: import.meta.env.STRIPE_LIFETIME_PRODUCT_ID || 'prod_UhYgimlIH65Vg6' 
  },
};
