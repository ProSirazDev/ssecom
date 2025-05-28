
import stripe from '../config/stripe.js';

export const createPaymentIntent = async (req, res) => {
  const { amount, currency = 'inr' } = req.body;

  if (
    !amount ||
    typeof amount !== 'number' ||
    amount <= 0 ||
    !Number.isInteger(amount)
  ) {
    return res.status(400).json({ error: 'Invalid amount provided' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe PaymentIntent Error:', {
      message: err.message,
      type: err.type,
      code: err.code,
    });
    res.status(500).json({ error: 'Payment failed. Try again.' });
  }
};
