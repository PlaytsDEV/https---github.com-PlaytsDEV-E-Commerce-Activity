import { useState } from 'react';
import PropTypes from 'prop-types';

export default function CheckoutPage({ cart, clearCart }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'Cash on Delivery'
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const overallTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = 'Valid email is required.';
    if (!formData.phone.match(/^\+?[0-9]{10,12}$/)) newErrors.phone = 'Valid phone number is required (10-12 digits).';
    if (!formData.address.trim()) newErrors.address = 'Delivery address is required.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSubmitted(true);
      clearCart();
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-white border border-green-200 p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold text-green-600 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600">Thank you for your purchase. Your order will be shipped via Cash on Delivery.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Checkout Form</h2>
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name:</label>
          <input 
            type="text" 
            value={formData.fullName} 
            onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.fullName && <span className="text-red-500 text-xs mt-1 block">{errors.fullName}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address:</label>
          <input 
            type="email" 
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number:</label>
          <input 
            type="text" 
            value={formData.phone} 
            onChange={(e) => setFormData({...formData, phone: e.target.value})} 
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address:</label>
          <textarea 
            value={formData.address} 
            onChange={(e) => setFormData({...formData, address: e.target.value})} 
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none h-24"
          />
          {errors.address && <span className="text-red-500 text-xs mt-1 block">{errors.address}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method:</label>
          <select value={formData.paymentMethod} disabled className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-500">
            <option>Cash on Delivery</option>
          </select>
        </div>

        <h3 className="text-xl font-bold text-gray-900 pt-2">Total Due: PHP {overallTotal}</h3>
        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow">Place Order</button>
      </form>
    </div>
  );
}

CheckoutPage.propTypes = {
  cart: PropTypes.array.isRequired,
  clearCart: PropTypes.func.isRequired,
};