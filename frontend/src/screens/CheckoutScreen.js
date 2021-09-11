import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from '../components/CheckoutForm';
import axios from 'axios';
import FormContainer from '../components/FormContainer';

import './CheckoutScreen.css';

const promise = loadStripe(
  'pk_test_51J7EykGHksnS4US2yXqoORb7QjSHgzD77JO6DCsnT61OgZAC01G2qFvuyzgWlITZSjCCGbzLyZKYS4PmaJUGK0w000FJzADG3f'
);

const CheckoutScreen = ({ match }) => {
  const orderId = match.params.id;

  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const createPaymentIntent = async () => {
      const res = await axios.post(`/api/orders/${orderId}/paymentIntent`);
      setClientSecret(res.data.clientSecret);
    };
    createPaymentIntent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='checkout-screen'>
      <Elements stripe={promise}>
        <FormContainer>
          <CheckoutForm clientSecret={clientSecret} orderId={orderId} />
        </FormContainer>
      </Elements>
    </div>
  );
};

export default CheckoutScreen;
