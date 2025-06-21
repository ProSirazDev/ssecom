import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from '../utils/axiosInstance';
import {  useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const amount = location.state?.amount || 5000;
   const navigate = useNavigate(); 

  useEffect(() => {
    const createIntent = async () => {
      try {
        const res = await axios.post('http://localhost:5000/api/payments/create-payment-intent', {
          amount,
        }, {
          withCredentials: true,
        });
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error(err);
        setError('Failed to initiate payment');
      }
    };

    createIntent();
  }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError('');

    if (!stripe || !elements || !clientSecret) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        setPaymentSuccess(true);
        setProcessing(false);
       
      }
    }
  };

  return (
    <div className="min-h-screen flex max-w-3xl mx-auto justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Complete Your Payment</h2>
        
        <div className="mb-4 text-center">
          <p className="text-gray-600 text-sm">Amount to Pay:</p>
          <p className="text-3xl font-semibold text-indigo-600">₹{(amount / 100).toFixed(2)}</p>
        </div>

        {paymentSuccess ? (
          <div className="text-green-600 text-center font-medium text-lg">
            ✅ Payment Successful! Thank you 🎉
            <br/>
              <span className=''> Your order has been placed successfully.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="border p-3 rounded-md mb-4 shadow-sm">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#32325d',
                      '::placeholder': {
                        color: '#a0aec0',
                      },
                    },
                  },
                }}
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <button
              type="submit"
              disabled={!stripe || processing}
              className="w-full bg-teal-600 hover:bg-indigo-700 text-white py-2 px-4 rounded font-medium transition duration-200"
            >
              {processing ? 'Processing Payment...' : 'Pay Now'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Checkout;
