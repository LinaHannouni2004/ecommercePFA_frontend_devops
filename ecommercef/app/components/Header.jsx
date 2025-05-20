"use client";
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { navLists } from '../constants';

function Header() {
  const router = useRouter();

  const handleNavClick = (navItem) => {
    if (navItem === "Store") {
      router.push('/products');
    }
  
    else if (navItem === "Support") {
      router.push('/aboutus');
    }
    else if (navItem === "Mac" || navItem === "iPhone") {
      // Scroll to highlights section
      const highlightsSection = document.getElementById('highlights');
      if (highlightsSection) {
        highlightsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="bg-black w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <Image src='/logoWeb.svg' alt='logo' width={50} height={50} />
      </div>

      {/* Navigation principale */}
      <nav className="hidden md:flex flex-1 justify-center">
        {navLists.map((navItem) => (
          <div
            key={navItem}
            className="px-5 w-20 text-sm cursor-pointer text-gray-500 hover:text-white transition-colors"
            onClick={() => handleNavClick(navItem)}
          >
            {navItem}
          </div>
        ))}
      </nav>

      {/* Auth Buttons */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => router.push('SignupRegister/signup')}
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button 
            onClick={() => router.push('SignupRegister/register')}
            className="text-sm bg-gray-800 hover:bg-gray-700 text-white px-4 py-1 rounded-md transition-colors"
          >
            Register
          </button>
        </div>

        {/* Menu mobile */}
        <button className="md:hidden rounded-sm bg-gray-800 p-2 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;