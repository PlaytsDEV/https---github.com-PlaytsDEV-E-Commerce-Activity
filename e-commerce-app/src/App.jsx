import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { products } from './data/products';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';

export default function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(prevCart => prevCart.map(item => item.id === id ? { ...item, quantity } : item));
    }
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <AppRoutes
        cart={cart}
        cartCount={cartCount}
        clearCart={clearCart}
        onAddToCart={addToCart}
        onLogin={setUser}
        onLogout={() => setUser(null)}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        user={user}
      />
    </Router>
  );
}

function AppRoutes({
  cart,
  cartCount,
  clearCart,
  onAddToCart,
  onLogin,
  onLogout,
  removeFromCart,
  updateQuantity,
  user,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const addToCart = (product) => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    onAddToCart(product);
  };

  return (
    <>
      <Navbar cartCount={cartCount} user={user} onLogout={onLogout} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/products" element={<ProductListing products={products} addToCart={addToCart} />} />
          <Route path="/products/:id" element={<ProductDetails products={products} addToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
          <Route path="/checkout" element={user ? <CheckoutPage cart={cart} clearCart={clearCart} /> : <Navigate to="/login" state={{ from: '/checkout' }} replace />} />
          <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
          <Route path="/register" element={<RegisterPage onRegister={onLogin} />} />
        </Routes>
      </div>
    </>
  );
}

AppRoutes.propTypes = {
  cart: PropTypes.array.isRequired,
  cartCount: PropTypes.number.isRequired,
  clearCart: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  user: PropTypes.object,
};