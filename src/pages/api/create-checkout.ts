import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { PRICE_LOOKUP } from '../../lib/stripe';

export const POST: APIRoute = async ({ request }) => {
  const secretKey = import.meta.env.STRIPE_SECRET_KEY;
  
  if (!secretKey) {
    return new Response(JSON.stringify({ 
      error: 'STRIPE_SECRET_KEY is not configured in your environment variables.' 
    }), { status: 500 });
  }

  const stripe = new Stripe(secretKey, {
    apiVersion: '2025-01-27.acacia' as any,
  });

  try {
    const { plan, userId, userEmail } = await request.json();

    if (!plan || !userId || !userEmail) {
      return new Response(JSON.stringify({ error: 'Missing required fields (plan, userId, or userEmail)' }), { status: 400 });
    }

    // Try to get Price ID from env, fallback to Product ID from PRICE_LOOKUP
    const envPriceId = plan === 'pro' ? import.meta.env.STRIPE_PRO_PRICE_ID : import.meta.env.STRIPE_LIFETIME_PRICE_ID;
    const lookup = PRICE_LOOKUP[plan as keyof typeof PRICE_LOOKUP];

    if (!envPriceId && !lookup) {
      return new Response(JSON.stringify({ error: `Invalid plan or missing configuration for: ${plan}` }), { status: 400 });
    }

    const sessionOptions: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${import.meta.env.SITE || 'http://localhost:4321'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${import.meta.env.SITE || 'http://localhost:4321'}/`,
      customer_email: userEmail,
      metadata: {
        userId,
        plan,
      },
      line_items: [],
    };

    if (envPriceId) {
      sessionOptions.line_items?.push({
        price: envPriceId,
        quantity: 1,
      });
    } else {
      // Use Product ID and create an ad-hoc price
      sessionOptions.line_items?.push({
        price_data: {
          currency: 'usd',
          product: lookup.productId,
          unit_amount: lookup.amount,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create(sessionOptions);

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
