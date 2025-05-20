'use client';
import { useState, useEffect } from 'react';
import { ArrowUpIcon } from "@heroicons/react/24/solid";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    isVisible && (
   <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 p-3 bg-[rgb(168,157,91)] rounded-full shadow-lg hover:bg-[rgb(140,130,70)] transition-all duration-300"
        aria-label="Retour en haut"
      >
        <ArrowUpIcon className="h-6 w-6 text-white" />
      </button>
    )
  );
};

export default ScrollToTopButton;