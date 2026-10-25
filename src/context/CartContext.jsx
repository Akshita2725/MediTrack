import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { useToast } from './ToastContext.jsx';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('meditrack_cart_items', [
    {
      id: 'med-01',
      name: 'Amoxicillin 500mg',
      category: 'Antibiotics',
      price: 18.50,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80',
      prescriptionRequired: true
    }
  ]);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toast = useToast();

  // Add item to global cart
  const addToCart = useCallback((product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
          quantity: qty,
          prescriptionRequired: product.prescriptionRequired
        }
      ];
    });
    toast.success(`Added ${product.name} to pharmacy cart`);
  }, [setCartItems, toast]);

  // Remove item
  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.id === productId);
      if (item) {
        toast.info(`Removed ${item.name} from cart`);
      }
      return prev.filter((i) => i.id !== productId);
    });
  }, [setCartItems, toast]);

  // Update item quantity
  const updateQuantity = useCallback((productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: Math.min(qty, 99) } : item
      )
    );
  }, [removeFromCart, setCartItems]);

  // Clear cart
  const clearCart = useCallback(() => {
    setCartItems([]);
    setCouponCode('');
    setDiscountPercent(0);
  }, [setCartItems]);

  // Apply promo code (demonstrating business logic in state architecture)
  const applyCoupon = useCallback((code) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'HEALTH10') {
      setCouponCode('HEALTH10');
      setDiscountPercent(10);
      toast.success('Coupon HEALTH10 applied! (10% discount)');
      return true;
    }
    if (trimmed === 'CLINIC20') {
      setCouponCode('CLINIC20');
      setDiscountPercent(20);
      toast.success('VIP Coupon CLINIC20 applied! (20% discount)');
      return true;
    }
    toast.error('Invalid coupon code. Try HEALTH10 or CLINIC20');
    return false;
  }, [toast]);

  // Calculated values using useMemo
  const totalItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    return (subtotal * discountPercent) / 100;
  }, [subtotal, discountPercent]);

  const tax = useMemo(() => {
    // 5% standard healthcare sales tax
    return (subtotal - discountAmount) * 0.05;
  }, [subtotal, discountAmount]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + tax);
  }, [subtotal, discountAmount, tax]);

  const value = {
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
    total,
    isCartOpen,
    setIsCartOpen
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
