import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BootstrapProvider from '../components/BootstrapProvider';
import { Noto_Serif_Devanagari } from 'next/font/google';

const devanagariFont = Noto_Serif_Devanagari({
  subsets: ['devanagari', 'latin'],
  weight: ['400', '600', '700'],
  variable: '--font-devanagari',
  display: 'swap',
});

export const metadata = {
  title: 'Raajsi',
  description: 'Raajsi is a skincare brand that offers a range of products to help you look and feel your best',
  icons: {
    icon: '/royal-logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${devanagariFont.variable}`}>
        <BootstrapProvider>
          <Navbar />
          {children}
          <Footer />
        </BootstrapProvider>
      </body>
    </html>
  );
}
