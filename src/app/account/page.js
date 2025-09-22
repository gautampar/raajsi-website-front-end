'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../../styles/Account.css';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'address'

  const handleNav = (tab) => (e) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  return (
    <div className="container account-page" role="main">
      <h1 className="account-heading">MY ACCOUNT</h1>
      <div className="account-wrapper">
        {/* Left Sidebar */}
        <aside className="account-sidebar" aria-label="Account navigation">
          <ul className="account-menu" role="tablist" aria-orientation="vertical">
            <li>
              <a
                href="#"
                onClick={handleNav('dashboard')}
                className={activeTab === 'dashboard' ? 'active' : ''}
                aria-current={activeTab === 'dashboard' ? 'page' : undefined}
                role="tab"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={handleNav('address')}
                className={activeTab === 'address' ? 'active' : ''}
                aria-current={activeTab === 'address' ? 'page' : undefined}
                role="tab"
              >
                Address
              </a>
            </li>
            <li><Link href="#">Logout</Link></li>
          </ul>
        </aside>

        {/* Center Content */}
        <main>
          <div className="account-greeting">
            Hello <span className="name">Vipul Sharma</span> ( Not <span className="name">Vipul Sharma</span>? <Link href="#">Log Out</Link> )
          </div>

          {activeTab === 'dashboard' && (
            <>
              <section className="account-section mb-4">
                <div className="section-title-1" style={{fontFamily: "'Rose Velt Personal Use Only', serif", marginBottom: "1.2rem!important", fontSize: "1.5rem"}}>Order History</div>
                <div className="order-banner">
                  <span className="cta">Make Your First Order</span>
                  You Haven&apos;t Placed Any Orders Yet.
                </div>
              </section>

              <section className="account-section">
                <div className="section-title-1" style={{fontFamily: "'Rose Velt Personal Use Only', serif", marginBottom: "1.2rem!important", fontSize: "1.5rem"}}>Account Details</div>
                <div className="details-list">
                  <div className="details-row">
                    <div className="details-label">Name</div>
                    <div className="details-value">Vipul Sharma</div>
                  </div>
                  <div className="details-row">
                    <div className="details-label">Email</div>
                    <div className="details-value">vipul@gmail.com</div>
                  </div>
                </div>
                <div className="mt-4">
                  <button type="button" className="address-btn" onClick={() => setActiveTab('address')}>View Address</button>
                </div>
              </section>
            </>
          )}

          {activeTab === 'address' && (
            <section className="account-section" aria-labelledby="address-heading">
              <div id="address-heading" className="section-title-1" style={{fontFamily: "'Rose Velt Personal Use Only', serif", marginBottom: "1.2rem!important", fontSize: "1.5rem"}}>Address Details</div>
              <form className="address-form" onSubmit={(e) => e.preventDefault()} noValidate>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" className="form-control" type="text" placeholder="Full Name" required autoFocus />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" className="form-control" type="email" placeholder="Email Address" required />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" className="form-control" type="text" placeholder="Company" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="address1">Address</label>
                  <input id="address1" name="address1" className="form-control" type="text" placeholder="Address" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input id="country" name="country" className="form-control" type="text" placeholder="India" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zip">Zip Code</label>
                    <input id="zip" name="zip" className="form-control" type="text" placeholder="452339" inputMode="numeric" pattern="[0-9]{5,6}" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" className="form-control" type="tel" placeholder="+91 9898989898" required />
                </div>
                
                <div className="mt-3">
                  <button type="submit" className="address-btn">Add Address</button>
                </div>
              </form>
            </section>
          )}
        </main>

        {/* Right Feature Panel */}
        <div className="feature-card">
          <Image src="/mci.png" alt="Feature" fill className="feature-img" />
          <div className="feature-overlay" />
        </div>
      </div>
    </div>
  );
}