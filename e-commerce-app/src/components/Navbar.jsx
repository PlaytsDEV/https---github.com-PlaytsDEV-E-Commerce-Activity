import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Navbar({ cartCount, user, onLogout }) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-indigo-600">
        <Link to="/">ShopEase</Link>
      </div>
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">Home</Link>
        <Link to="/products" className="text-gray-700 hover:text-indigo-600 font-medium">Catalog</Link>
        <Link to="/cart" className="relative text-gray-700 hover:text-indigo-600 font-medium">
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </Link>
        <Link to="/checkout" className="text-gray-700 hover:text-indigo-600 font-medium">Checkout</Link>
        {user ? (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">Hello, {user.name || user.email}</span>
            <button onClick={onLogout} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Logout</button>
          </div>
        ) : (
          <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">Login</Link>
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  cartCount: PropTypes.number.isRequired,
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};