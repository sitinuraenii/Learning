import React from 'react';
import Navbar from './navbar';

const About: React.FC = () => {
  return (
    <>
    <Navbar />
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tentang</h1>
      <p>Ini halaman About. Kamu bisa menulis info tentang website di sini.</p>
    </div>
    </>
  );
};

export default About;
