import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { PHARMACY_PRODUCTS, PHARMACY_CATEGORIES } from '../data/pharmacyData.js';

export function PharmacyStorePage() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    total
  } = useCart();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Filter products by category and search term
  const filteredProducts = PHARMACY_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => {
      setOrderPlaced(false);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pharmacy & Health Store</h1>
          <p className="text-gray-500 text-sm">Order prescription medications and everyday health supplies</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold">
          Cart: {totalItems} items (${total.toFixed(2)})
        </div>
      </div>

      {orderPlaced && (
        <div className="bg-green-100 border border-green-200 text-green-800 p-4 rounded-xl text-center font-medium">
          Order placed successfully! Your medicines will be ready for clinic pickup or delivery.
        </div>
      )}

      {/* Main Grid: Products + Cart Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products Section */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-3 justify-between items-center">
            <input
              type="text"
              placeholder="Search medicines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-60 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${
                  selectedCategory === 'All'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {PHARMACY_CATEGORIES.map((cat) => (
                <button
                  key={cat.id || cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${
                    selectedCategory === cat.name
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col justify-between space-y-3 hover:shadow-md transition"
              >
                <div className="flex gap-3">
                  <img
                    src={product.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80'}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover bg-gray-50 border border-gray-100"
                  />
                  <div className="flex-1">
                    <span className="text-[10px] uppercase font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                      {product.category}
                    </span>
                    <h3 className="font-bold text-gray-800 text-sm mt-1">{product.name}</h3>
                    <p className="text-xs text-gray-500">{product.dosage || 'Standard dose'}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-base font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Summary Sidebar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4 h-fit">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <h2 className="font-bold text-gray-800 text-base">Your Cart ({totalItems})</h2>
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-red-500 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">
              Your cart is empty. Click "+ Add to Cart" on any product.
            </div>
          ) : (
            <div className="space-y-3">
              <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs p-2 bg-gray-50 rounded-lg">
                    <div className="flex-1 pr-2">
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-gray-500">${item.price.toFixed(2)} each</p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-5 h-5 bg-white border border-gray-300 rounded flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-5 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-5 h-5 bg-white border border-gray-300 rounded flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 ml-1 text-sm font-bold"
                        title="Remove"
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-3 space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between font-bold text-sm text-gray-900 pt-1">
                  <span>Total Amount</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-lg text-sm transition"
              >
                Checkout & Order (${total.toFixed(2)})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
