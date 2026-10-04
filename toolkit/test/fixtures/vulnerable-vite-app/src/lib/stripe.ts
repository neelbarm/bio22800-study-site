import Stripe from 'stripe';

// Creates checkout sessions directly from the browser
export const stripe = new Stripe('{{FAKE_STRIPE_LIVE}}');
