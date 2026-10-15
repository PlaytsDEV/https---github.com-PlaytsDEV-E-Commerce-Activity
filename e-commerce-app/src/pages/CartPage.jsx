import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CartPage({ cart, updateQuantity, removeFromCart }) {
  const overallTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Shopping Cart</h2>
        <p className="text-gray-500 mb-8">Your cart is currently empty.</p>
        <Link to="/products" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Shopping Cart</h2>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6 space-y-6">
        {cart.map(item => (
          <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-100 pb-6 gap-4">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg border" />
              <div>
                <h4 className="font-semibold text-lg text-gray-800">{item.name}</h4>
                <p className="text-indigo-600 font-medium">PHP {item.price}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="bg-gray-200 px-3 py-1 rounded font-bold hover:bg-gray-300">-</button>
              <span className="font-semibold text-lg w-8 text-center">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="bg-gray-200 px-3 py-1 rounded font-bold hover:bg-gray-300">+</button>
            </div>
            <p className="font-bold text-gray-800">Subtotal: PHP {item.price * item.quantity}</p>
            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 font-medium text-sm">Remove</button>
          </div>
        ))}
        <div className="flex justify-between items-center pt-4">
          <h3 className="text-2xl font-bold text-gray-900">Total: PHP {overallTotal}</h3>
          <Link to="/checkout" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow">Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  );
}

CartPage.propTypes = {
  cart: PropTypes.array.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};