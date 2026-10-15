import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ProductDetails({ products, addToCart }) {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
        <Link to="/products" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">Back to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
        <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-xl shadow-md" />
        <div>
          <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">{product.category}</span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-3 mb-2">{product.name}</h2>
          <p className="text-2xl font-bold text-indigo-600 mb-4">PHP {product.price}</p>
          <p className="text-sm text-gray-500 mb-4">Stock Available: <span className="font-semibold text-gray-700">{product.stock} units</span></p>
          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>
          
          <div className="flex space-x-4">
            <button onClick={() => addToCart(product)} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition shadow">Add to Cart</button>
            <Link to="/products" className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition">Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductDetails.propTypes = {
  products: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
};