import { Stripe } from '@stripe/stripe-react-native';

Stripe.setOptionsAsync({
  publishableKey: '<YOUR_STRIPE_PUBLISHABLE_KEY>',
});
