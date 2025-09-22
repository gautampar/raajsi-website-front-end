'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './cart.css';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Royal Glow Serum",
      price: 2499,
      originalPrice: 4999,
      quantity: 1,
      image: "/f1.png",
      description: "Luxurious anti-aging serum with 24k gold"
    },
    {
      id: 2,
      name: "Radiance Face Cream",
      price: 1899,
      originalPrice: 3799,
      quantity: 2,
      image: "/f2.png",
      description: "Hydrating cream for glowing skin"
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'royal10') {
      setDiscount(10);
    } else if (promoCode.toLowerCase() === 'welcome20') {
      setDiscount(20);
    } else {
      setDiscount(0);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const shipping = subtotal > 2000 ? 0 : 199;
  const total = subtotal - discountAmount + shipping;

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1 className="cart-page-title" style={{color: '#000000 !important'}}>Shopping Cart</h1>
          <p className="cart-subtitle">Review your selected items and proceed to checkout</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2 className="empty-cart-title">Your cart is empty</h2>
            <p className="empty-cart-text">Discover our luxurious skincare products</p>
            <Link href="/featured-products" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items-section">
              <div className="cart-items-header">
                <h2 className="" style={{color: '#000000 !important', fontFamily: 'Rose Velt Personal Use Only, serif !important'}}>Cart Items ({cartItems.length})</h2>
              </div>
              
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        width={120}
                        height={120}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-description">{item.description}</p>
                      
                      <div className="item-pricing">
                        <span className="current-price">₹{item.price.toLocaleString()}</span>
                        <span className="original-price">₹{item.originalPrice.toLocaleString()}</span>
                        <span className="discount-badge">
                          {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                        </span>
                      </div>
                    </div>
                    
                    <div className="item-controls">
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="item-total">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                      
                      <button 
                        className="remove-btn"
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                      >
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cart-summary-section">
              <div className="cart-summary">
                <h2 className="" style={{color: '#000000 !important', fontFamily: 'Rose Velt Personal Use Only, serif !important'}}>Order Summary</h2>
                
                <div className="promo-section">
                  <h3 className="promo-title">Promo Code</h3>
                  <div className="promo-input-group">
                    <input 
                      type="text"
                      className="promo-input"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button className="apply-promo-btn" onClick={applyPromoCode}>
                      Apply
                    </button>
                  </div>
                  {discount > 0 && (
                    <div className="promo-success">
                      ✅ {discount}% discount applied!
                    </div>
                  )}
                </div>
                
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="summary-row discount-row">
                      <span>Discount ({discount}%)</span>
                      <span>-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                  
                  {shipping === 0 && (
                    <div className="free-shipping-note">
                      🎉 You&apos;ve qualified for free shipping!
                    </div>
                  )}
                  
                  <div className="summary-row total-row">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="checkout-actions">
                  <button className="checkout-btn">
                    Proceed to Checkout
                  </button>
                  
                  <Link href="/featured-products" className="continue-shopping-link">
                    Continue Shopping
                  </Link>
                </div>
              </div>
              
              <div className="security-badges">
                <div className="security-item">
                  <span className="security-icon">🔒</span>
                  <span>Secure Checkout</span>
                </div>
                <div className="security-item">
                  <span className="security-icon">🚚</span>
                  <span>Free Shipping on ₹2000+</span>
                </div>
                <div className="security-item">
                  <span className="security-icon">↩️</span>
                  <span>30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}