import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(
  'pk_test_51J7EykGHksnS4US2yXqoORb7QjSHgzD77JO6DCsnT61OgZAC01G2qFvuyzgWlITZSjCCGbzLyZKYS4PmaJUGK0w000FJzADG3f'
);

const StripeCard = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeCard;
