'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import '../styles/Navbar.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import OTPLogin from './OTPLogin';

export default function Navbar({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (path) => pathname === path;
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  // NEW: Login modal state
  const [loginOpen, setLoginOpen] = useState(false);
  const handleCartClick = (e) => {
    e.preventDefault();
    setCartOpen((open) => !open);
  };
  const handleCloseCart = () => setCartOpen(false);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((item) => item.title === product.title);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx].qty += 1;
        return updated;
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };
  const handleRemoveItem = (title) => {
    setCartItems((prev) => prev.filter((item) => item.title !== title));
  };
  const handleClearCart = () => setCartItems([]);
  const handleQtyChange = (title, delta) => {
    setCartItems((prev) => prev.map((item) =>
      item.title === title ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNav = (href) => {
    setMobileMenuOpen(false);
    router.push(href); // ✅ FIXED: replaced router.replace() + setTimeout
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white border-bottom py-1 fixed-top">
        <div className="container-fluid px-5">
          <div className="row w-100 align-items-center justify-content-between position-relative">
            <div className="col-4 d-none d-lg-flex justify-content-start gap-4 align-items-center nav-links-left">
              <Link href="/" className={`nav-link nav-item fs-6 nudge-right ${isActive("/") ? "active-link" : ""}`}>ROYAL HOME</Link>
              <Link href="/royal-promises" className={`nav-link nav-item fs-6 nudge-rig ${isActive("/royal-promises") ? "active-link" : ""}`}>THE ROYAL PROMISE</Link>
            </div>
            <div className="col-8 col-lg-4 d-flex justify-content-start justify-content-lg-center">
              <Link href="/" className="navbar-brand">
                <Image src="/royal-logo.png" alt="Royal Logo" width={50} height={50} style={{ objectFit: "contain" }} />
              </Link>
            </div>
            <div className="col-4 d-flex d-lg-flex justify-content-end gap-5 position-relative nav-links-right">
              <Link href="/our-essence" className={`nav-link ${isActive("/our-essence") ? "active-link" : ""}`}>OUR ESSENCE</Link>
              <Link href="/featured-products" className={`nav-link nav-item fs-8  ${isActive("/featured-products") ? "active-link" : ""}`}>FEATURED PRODUCTS</Link>
              {/* Removed desktop ACCOUNT link to revert to previous navbar */}
              <button type="button" className="nav-link nav-icon bg-transparent border-0 p-0" onClick={() => setLoginOpen(true)} aria-label="Open login">
                <i className="bi bi-person fs-5"></i>
              </button>
              <button className="nav-link nav-icon bg-transparent border-0 p-0" style={{ outline: "none", boxShadow: "none" }} onClick={handleCartClick} aria-label="Open cart">
                <i className="bi bi-cart fs-5"></i>
              </button>
              {cartOpen && (
                <div
                  className="cart-popup position-absolute"
                  style={{
                    top: '48px',
                    right: 0,
                    minWidth: '340px',
                    background: '#fff',
                    borderRadius: '18px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                    zIndex: 9999,
                    padding: '1.5rem 1.5rem 1.2rem 1.5rem',
                    color: '#2c1e1e',
                    maxWidth: '95vw',
                  }}
                >
                  <button
                    onClick={handleCloseCart}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '14px',
                      background: 'none',
                      border: 'none',
                      fontSize: '1.2rem',
                      color: '#888',
                      cursor: 'pointer',
                    }}
                    aria-label="Close cart"
                  >
                    &times;
                  </button>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem', color: '#5c0b28' }}>
                    SHOPPING CART
                  </div>
                  <div style={{ fontSize: '0.98rem', color: '#444', marginBottom: '1.2rem' }}>
                    {cartItems.length === 0 ? (
                      <>Your Cart is Currently Empty.</>
                    ) : (
                      <>
                        Currently {cartItems.reduce((sum, item) => sum + item.qty, 0)} Item{cartItems.reduce((sum, item) => sum + item.qty, 0) > 1 ? 's' : ''} Were Added in Cart
                      </>
                    )}
                  </div>
                  {cartItems.length > 0 && (
                    <div style={{ maxHeight: '220px', overflowY: 'auto', marginBottom: '1rem' }}>
                      {cartItems.map((item, idx) => (
                        <div key={item.title} className="d-flex align-items-center mb-3" style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                          <img src={item.image} alt={item.title} style={{ width: 54, height: 54, borderRadius: 8, objectFit: 'cover', marginRight: 12 }} />
                          <div className="flex-grow-1">
                            <div style={{ fontWeight: 600, fontSize: '1rem', color: '#5c0b28' }}>{item.title}</div>
                            <div style={{ fontSize: '0.98rem', color: '#444' }}>{item.price}</div>
                            <div className="d-flex align-items-center mt-1">
                              <button className="btn btn-sm btn-outline-secondary px-2 py-0 me-1" style={{ fontSize: '0.9rem', borderRadius: '50%' }} onClick={() => handleQtyChange(item.title, -1)}>-</button>
                              <span style={{ minWidth: 22, textAlign: 'center' }}>{item.qty}</span>
                              <button className="btn btn-sm btn-outline-secondary px-2 py-0 ms-1" style={{ fontSize: '0.9rem', borderRadius: '50%' }} onClick={() => handleQtyChange(item.title, 1)}>+</button>
                              <button className="btn btn-sm btn-link text-danger ms-2" style={{ fontSize: '0.9rem' }} onClick={() => handleRemoveItem(item.title)}>&times;</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {cartItems.length > 0 && (
                    <div className="text-center mb-2">
                      <button className="btn btn-link text-danger p-0" style={{ fontSize: '0.95rem' }} onClick={handleClearCart}>Clear All Items</button>
                    </div>
                  )}
                  <Link
                    href="/featured-products"
                    className="btn btn-dark w-100"
                    style={{
                      background: '#5c0b28',
                      color: '#fff',
                      borderRadius: '22px',
                      fontWeight: 500,
                      fontSize: '1rem',
                      padding: '8px 0',
                    }}
                  >
                    VIEW PRODUCTS
                  </Link>
                </div>
              )}
            </div>
            <button
              className={`mobile-nav-toggle d-lg-none ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Toggle navigation"
            >
              <div className="hamburger-icon">
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </div>
            </button>
          </div>
        </div>
      </nav>
      {/* Modern Mobile Drawer */}
      <div className={`modern-drawer ${mobileMenuOpen ? "open" : ""} d-lg-none`}>
        <div className="drawer-overlay" onClick={() => setMobileMenuOpen(false)}></div>
        <div className="drawer-panel">
          <div className="drawer-header">
            <div className="drawer-brand">
              <Image src="/royal-logo.png" alt="Royal Logo" width={40} height={40} style={{ objectFit: "contain" }} />
              <span className="brand-text">RAAJSI</span>
            </div>
            <button type="button" className="drawer-close-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
              <div className="close-icon">
                <span></span>
                <span></span>
              </div>
            </button>
          </div>

          <div className="drawer-body">
            <div className="nav-section">
              <h3 className="section-title">Navigation</h3>
              <div className="nav-cards">
                <Link
                  href="/"
                  className={`nav-card ${isActive("/") ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="nav-card-text">ROYAL HOME</span>
                </Link>
                <Link
                  href="/royal-promises"
                  className={`nav-card ${isActive("/royal-promises") ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="nav-card-text">THE ROYAL PROMISE</span>
                </Link>
                <Link
                  href="/our-essence"
                  className={`nav-card ${isActive("/our-essence") ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="nav-card-text">OUR ESSENCE</span>
                </Link>
                <Link
                  href="/featured-products"
                  className={`nav-card ${isActive("/featured-products") ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="nav-card-text">FEATURED PRODUCTS</span>
                </Link>
                {/* Removed mobile ACCOUNT nav card to match previous navbar */}
              </div>
            </div>

            <div className="action-section">
              <h3 className="section-title">Account</h3>
              <div className="action-cards">
                <button type="button" className="action-card" onClick={() => { setMobileMenuOpen(false); setLoginOpen(true); }}>
                  <span className="action-card-text">My Account</span>
                </button>
                <Link
                  href="/cart"
                  className="action-card"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="action-card-text">Shopping Cart</span>
                  {cartItems.length > 0 && <span className="cart-badge">{cartItems.reduce((sum, item) => sum + item.qty, 0)}</span>}
                </Link>
                <button type="button" className="action-card" onClick={() => { setMobileMenuOpen(false); handleCartClick({ preventDefault: () => { } }); }}>
                  <span className="action-card-text">Cart Popup</span>
                  {cartItems.length > 0 && <span className="cart-badge">{cartItems.reduce((sum, item) => sum + item.qty, 0)}</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {children && React.Children.map(children, (child) => (
        React.isValidElement(child)
          ? React.cloneElement(child, { onAddToCart: handleAddToCart })
          : child
      ))}

      {/* Login Modal */}
      {loginOpen && (
        <div className="auth-modal-overlay" onClick={() => setLoginOpen(false)}>
          <div className="auth-modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="authModalTitle">
          <OTPLogin setLoginOpen={setLoginOpen} />
          </div>
        </div>
      )}
    </>
  );
}
