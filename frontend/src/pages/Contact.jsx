import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white py-10 px-6 md:px-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Contact Us</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-700">Get in Touch</h3>
          <p className="text-gray-600">We'd love to hear from you! Reach out with any questions or feedback.</p>

          <div>
            <p className="text-gray-800 font-medium">Email:</p>
            <p className="text-gray-600">support@yourecom.com</p>
          </div>

          <div>
            <p className="text-gray-800 font-medium">Phone:</p>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>

          <div>
            <p className="text-gray-800 font-medium">Address:</p>
            <p className="text-gray-600">123, Market Street, Hyderabad, India</p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Your Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="john@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Your Message</label>
            <textarea
              className="w-full border border-gray-300 rounded px-4 py-2 h-32 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Type your message here..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
