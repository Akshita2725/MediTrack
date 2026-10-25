import React, { useState, useEffect, useMemo } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  ArrowUpDown,
  Plus,
  Minus,
  Trash2,
  Tag,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  X,
  CreditCard,
  Package
} from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { PHARMACY_PRODUCTS, PHARMACY_CATEGORIES } from '../data/pharmacyData.js';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { Modal } from '../components/common/Modal.jsx';

export const PharmacyStorePage = () => {
  // Global cart state (from Context API - Topic 49-54)
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    couponCode,
    discountPercent,
    discountAmount,
    totalItems,
    subtotal,
    tax,
    total
  } = useCart();

  const toast = useToast();

  // Local state for UI controls (Global vs Local State demonstration - Topic 49-54)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-asc', 'price-desc', 'rating'
  const [couponInput, setCouponInput] = useState('');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Async state & loading/error handling (Topic 49-54)
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [simulateError, setSimulateError] = useState(false);

  // Simulated Async API Fetch
  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (simulateError) {
            reject(new Error('Failed to connect to Pharmacy Gateway (503 Service Unavailable).'));
          } else {
            resolve(PHARMACY_PRODUCTS);
          }
        }, 600);
      });
      setProducts(PHARMACY_PRODUCTS);
    } catch (err) {
      setError(err.message || 'Unable to fetch products catalog.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [simulateError]);

  // Search, Filter, Sort Patterns (Topic 61-66)
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sort pattern
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyCoupon(couponInput);
    if (ok) setCouponInput('');
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warning('Your shopping cart is empty!');
      return;
    }
    setIsCheckoutModalOpen(true);
  };

  const handleConfirmOrder = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      clearCart();
      toast.success('Order placed successfully! Delivery scheduled within 24 hours.');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-blue-100 mb-3 border border-white/20">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Mini Project: Pharmacy & Supplies Shopping Cart</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Clinic Pharmacy & Medical Store
          </h1>
          <p className="text-sm text-blue-100/90 max-w-xl mt-1 leading-relaxed">
            Order prescription medications, diagnostic gear, and clinical supplies with real-time stock and checkout.
          </p>
        </div>

        {/* Global Cart Counter Pill */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white text-blue-700 flex items-center justify-center font-bold text-lg shadow-md">
            {totalItems}
          </div>
          <div>
            <div className="text-xs text-blue-200 uppercase font-bold tracking-wider">Cart Total</div>
            <div className="text-xl font-extrabold font-mono">${total.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Category Filter, Sort, Error Simulation */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medications, devices, categories..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-blue-600 focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-blue-700 outline-hidden cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>

            {/* Error Simulator Toggle (Demonstrating Async State & Error Handling) */}
            <button
              type="button"
              onClick={() => setSimulateError((prev) => !prev)}
              className={`text-xs px-3 py-1.5 rounded-xl font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                simulateError
                  ? 'bg-rose-50 text-rose-700 border-rose-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
              title="Click to test async error handling"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Simulate API Error: {simulateError ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>

        {/* Category Pills (Filter pattern) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1 mr-1" />
          {PHARMACY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
          {(selectedCategory !== 'All' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-rose-600 hover:underline ml-2"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Products on Left, Shopping Cart Summary on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products Column (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Loading State Skeleton */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 animate-pulse space-y-3"
                >
                  <div className="h-36 bg-slate-200 rounded-xl" />
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                  <div className="h-8 bg-slate-200 rounded-xl" />
                </div>
              ))}
            </div>
          )}

          {/* Error State with Retry Button */}
          {error && !isLoading && (
            <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-rose-900 text-base">Failed to Load Products</h3>
              <p className="text-sm text-rose-700 max-w-md mx-auto">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSimulateError(false);
                  fetchProducts();
                }}
                className="gap-2 bg-white text-rose-700 border-rose-300 hover:bg-rose-100"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Fetching Catalog</span>
              </Button>
            </div>
          )}

          {/* Products Catalog */}
          {!isLoading && !error && filteredProducts.length === 0 && (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-2">
              <Package className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-700">No medical products found</p>
              <p className="text-xs text-slate-500">Try adjusting your search query or category filter.</p>
            </div>
          )}

          {!isLoading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProducts.map((product) => {
                const inCart = cartItems.find((i) => i.id === product.id);

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-4 flex flex-col justify-between hover:shadow-md transition-shadow group"
                  >
                    <div>
                      {/* Image & Badge */}
                      <div className="relative h-36 w-full rounded-xl overflow-hidden bg-slate-100 mb-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-slate-700 px-2 py-0.5 rounded-md shadow-xs backdrop-blur-xs">
                            {product.category}
                          </span>
                          {product.prescriptionRequired && (
                            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-rose-600 text-white px-2 py-0.5 rounded-md shadow-xs">
                              Rx Required
                            </span>
                          )}
                        </div>
                        <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
                          ★ {product.rating} ({product.reviews})
                        </div>
                      </div>

                      {/* Info */}
                      <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Price & Action */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-400 font-medium">Price</span>
                        <div className="text-base font-extrabold font-mono text-slate-900">
                          ${product.price.toFixed(2)}
                        </div>
                      </div>

                      {inCart ? (
                        <div className="flex items-center gap-1.5 bg-slate-100 rounded-xl p-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, inCart.quantity - 1)}
                            className="w-7 h-7 rounded-lg bg-white text-slate-700 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer shadow-2xs"
                            title="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center font-bold text-xs font-mono">
                            {inCart.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, inCart.quantity + 1)}
                            className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer shadow-2xs"
                            title="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => addToCart(product, 1)}
                          className="gap-1.5 shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Shopping Cart Summary Column (1 col) */}
        <div className="space-y-4">
          <Card className="p-5 border-slate-200/90 shadow-md sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                <h2 className="font-extrabold text-base text-slate-900">Your Cart</h2>
              </div>
              <Badge variant="primary" className="font-bold">
                {totalItems} items
              </Badge>
            </div>

            {/* Cart Items List */}
            {cartItems.length === 0 ? (
              <div className="py-8 text-center text-slate-400 space-y-2">
                <ShoppingBag className="w-10 h-10 mx-auto text-slate-300" />
                <p className="text-sm font-semibold text-slate-600">Your cart is currently empty</p>
                <p className="text-xs text-slate-400">Add medications or supplies from the catalog.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto my-3 pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                      <p className="text-[11px] font-mono text-slate-500">
                        ${item.price.toFixed(2)} &times; {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 text-xs"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-xs font-mono font-bold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 text-xs"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-rose-500 hover:text-rose-700 p-1 ml-1"
                        title="Remove from cart"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Discount Promo Code Input */}
            {cartItems.length > 0 && (
              <form onSubmit={handleApplyCoupon} className="pt-3 border-t border-slate-100 flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon (HEALTH10)"
                    className="w-full text-xs pl-8 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-blue-600 uppercase font-mono"
                  />
                </div>
                <Button type="submit" variant="outline" size="sm" className="text-xs">
                  Apply
                </Button>
              </form>
            )}

            {couponCode && (
              <div className="mt-2 flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-2.5 py-1.5 rounded-lg border border-emerald-200 font-medium">
                <span>Code {couponCode} ({discountPercent}% OFF)</span>
                <span className="font-mono font-bold">-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            {/* Price Calculations */}
            {cartItems.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-slate-800">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span className="font-mono font-semibold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500">
                  <span>Healthcare Tax (5%)</span>
                  <span className="font-mono font-semibold text-slate-800">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
                  <span>Total Due</span>
                  <span className="font-mono text-base text-blue-700">${total.toFixed(2)}</span>
                </div>

                <div className="pt-3 space-y-2">
                  <Button
                    onClick={handleCheckout}
                    className="w-full py-2.5 gap-2 text-sm justify-center shadow-md bg-blue-600 hover:bg-blue-700"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Proceed to Checkout</span>
                  </Button>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="w-full text-center text-xs text-slate-400 hover:text-rose-600 transition-colors py-1 cursor-pointer"
                  >
                    Clear shopping cart
                  </button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Checkout Modal (Topic 61-66: Modal) */}
      <Modal
        isOpen={isCheckoutModalOpen}
        onClose={() => {
          if (!isCheckingOut) {
            setIsCheckoutModalOpen(false);
            setCheckoutComplete(false);
          }
        }}
        title="Confirm Clinic Order"
      >
        {checkoutComplete ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Order Confirmed!</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Your prescription & medical order #{Math.floor(100000 + Math.random() * 900000)} has been
              sent to the pharmacy dispensary.
            </p>
            <div className="pt-4">
              <Button
                onClick={() => {
                  setIsCheckoutModalOpen(false);
                  setCheckoutComplete(false);
                }}
                className="w-full justify-center"
              >
                Back to Pharmacy Store
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              Please review the billing details before confirming dispensary fulfillment:
            </p>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Items:</span>
                <span className="font-bold text-slate-800">{totalItems} units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment method:</span>
                <span className="font-bold text-slate-800">Clinic Account / Insurance Copay</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-1.5 font-bold">
                <span>Final Total:</span>
                <span className="text-blue-700 font-mono text-sm">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCheckoutModalOpen(false)}
                disabled={isCheckingOut}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleConfirmOrder}
                disabled={isCheckingOut}
                className="gap-2"
              >
                {isCheckingOut ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Authorize & Place Order</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
