'use client';

import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-white w-full shadow-md">
      <div className="flex items-center justify-start px-12 py-0.5 w-full space-x-12">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d7bf6ecb7df695e67c9d06f6dd931206a4aa3f1b3654c3f770cdee5effc7eec?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a"
            alt="Primary Logo"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-8 text-lg font-semibold">
          <Link
            href="/"
            className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
          >
            About
          </Link>
          <Link
            href="/services"
            className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
          >
            Contact
          </Link>
        </nav>

        {/* Additional Icon */}
        <div className="flex items-center">
         
        </div>
      </div>
    </header>
  );
};

export default Header;
