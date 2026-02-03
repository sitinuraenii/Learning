import React from 'react';
import Navbar from'@/layouts/nav-layout';
import Footer from './footer';

const Contact: React.FC = () => {
  return (
    <>
    <Navbar>
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Kontak</h1>
      <p>Ini halaman Contact. Bisa diisi form atau info kontak.</p>
    </div>
    </Navbar>
    <Footer />
    </>
  );
};

export default Contact;
