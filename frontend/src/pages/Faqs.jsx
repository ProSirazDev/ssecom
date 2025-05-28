import React, { useState } from 'react';

const faqData = [
  {
    question: 'How do I place an order?',
    answer:
      'To place an order, browse the products, add items to your cart, and proceed to checkout. Follow the on-screen instructions to complete your purchase.',
  },
  {
    question: 'What payment methods are accepted?',
    answer:
      'We accept major credit/debit cards, PayPal, and other secure payment gateways shown at checkout.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Standard shipping usually takes 3–7 business days. Delivery times may vary based on your location and shipping method selected.',
  },
  {
    question: 'Can I track my order?',
    answer:
      'Yes, once your order is shipped, we’ll email you the tracking number and a link to track your package in real time.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'We accept returns within 15 days of delivery for unused items in original packaging. Visit our Return Policy page for more details.',
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h1>

      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border border-gray-300 rounded-md">
            <button
              onClick={() => toggleIndex(index)}
              className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 font-medium flex justify-between items-center"
            >
              <span>{faq.question}</span>
              <span>{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="p-4 bg-white text-gray-700 border-t">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
