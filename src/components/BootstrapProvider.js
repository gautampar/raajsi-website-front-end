"use client";
import { useEffect } from 'react';

export default function BootstrapProvider({ children }) {
  useEffect(() => {
    // Import Bootstrap JavaScript only on the client side
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return <>{children}</>;
} 