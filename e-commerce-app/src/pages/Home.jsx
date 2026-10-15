import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Home({ products }) {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-indigo-900 text-white rounded-2xl p-12 text-center mb-12 shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Welcome to ShopEase</h1>
        <p className="text-lg text-indigo-200 max-w-2xl mx-auto mb-8">
          Discover high-quality products at unbeatable prices. Fast and reliable delivery right to your doorstep.
        </p>
        <Link to="/products" className="bg-white text-indigo-900 font-bold px-8 py-3 rounded-lg shadow hover:bg-indigo-50 transition">
          Shop Now
        </Link>
      </div>

      {/* Featured Products */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Featured Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h4 className="font-semibold text-gray-800 text-lg mb-1">{product.name}</h4>
                <p className="text-indigo-600 font-bold mb-4">PHP {product.price}</p>
              </div>
              <Link to={`/products/${product.id}`} className="block text-center bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition font-medium">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  products: PropTypes.array.isRequired,
};