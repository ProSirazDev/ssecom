// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { CartProvider } from './globalstate/cartcontext.jsx'
// import { AuthProvider } from './globalstate/authcontext.jsx'
// import { SearchProvider } from './globalstate/searchcontext.jsx'




// createRoot(document.getElementById('root')).render(
//    <SearchProvider>
//     <AuthProvider>
//       <CartProvider>
//         <App />
//       </CartProvider>
//     </AuthProvider>
//     </SearchProvider>

// )


// index.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './globalstate/cartcontext.jsx';
import { AuthProvider } from './globalstate/authcontext.jsx';
import { SearchProvider } from './globalstate/searchcontext.jsx';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Stripe public key (from .env or directly here in dev)
const stripePromise = loadStripe('pk_test_51R4lXdE6tE4NTGRYdUh94Ti5UkGLXfBdcV52pZDvD0YvryorAgAxXfjb1xGW2BDTyI6zfD3Dqp52MBCh7i8hMPbt00sqwml3aU'); // replace with your key

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchProvider>
      <AuthProvider>
        <CartProvider>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </CartProvider>
      </AuthProvider>
    </SearchProvider>
  </StrictMode>
);
