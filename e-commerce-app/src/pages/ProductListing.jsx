import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Pagination from '../components/Pagination';

export default function ProductListing({ products, addToCart }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Product Catalog</h2>
      
      {/* Search & Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="border border-gray-300 rounded-lg px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select 
          value={selectedCategory} 
          onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
          className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {currentProducts.length > 0 ? (
          currentProducts.map(product => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="font-semibold text-gray-800 text-lg mb-1">{product.name}</h3>
                <p className="text-indigo-600 font-bold mb-4">PHP {product.price}</p>
              </div>
              <div className="flex gap-2">
                <Link to={`/products/${product.id}`} className="flex-1 text-center bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-medium">Details</Link>
                <button onClick={() => addToCart(product)} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium">Add</button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-12">No products found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={(page) => setCurrentPage(page)} 
        />
      )}
    </div>
  );
}

ProductListing.propTypes = {
  products: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
};