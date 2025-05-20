'use client';
import { Fragment, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { appleImg, searchImg, bagImg } from '../utils';
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const navigation = {
  categories: [
    {
      id: 'Nos produit',
      name: 'Nos produit',
      featured: [
        {
          
          imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSOPpEZWs5-aif5n5F7nih-2EJyB9H6s6_bg&s',
          imageAlt: 'New arrival products',
        },
        {
          
          imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpHd38Zas18mXcXoqRWzDdzqAKZlVqyqZCkCre8N7BYsHzWli_mb8flP4IBj_NUCfWfHw&usqp=CAU',
          imageAlt: 'Best selling products',
        },
      ],
      sections: [
        {
          id: 'Nos produits',
          name: 'Nos produits',
          items: [
            { name: 'Smartwatch', href: '/products/smartwatch' },
            { name: 'Home Appliances', href: '/products/home-appliances' },
            { name: 'PC & Laptop', href: '/products/pc-laptop' },
            { name: 'Headphones & Airpods', href: '/products/headphones' },
            { name: 'Phone & Tablet', href: '/products/phones' },
            { name: 'Accessories', href: '/products/accessories' },
          ],
        },
      ],
    },
    {
      id: 'premium-products',
      name: 'Nos produits premium',
      featured: [
        {
          name: 'New Arrivals',
          imageSrc: 'https://specials-images.forbesimg.com/imageserve/61d8a1eb3a9cf24443034ea8/Asus-Zenbook-17-Fold-OLED/960x0.jpg?fit=scale',
          imageAlt: 'Premium new arrivals',
          href: '/products/premium/new-arrivals'
        },
        {
          name: 'Best Sells',
          imageSrc: 'https://static.wui.fr//photos/319808/zoom-ces-2022--%C2%A010-nouveaut%C3%A9s-fun-et-high-tech-%C3%A0-las-vegas.jpg',
          imageAlt: 'Premium best sellers',
          href: '/products/premium/best-sellers'
        },
      ],
      sections: [
        {
          id: 'Nos produits',
          items: [],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '/aboutus' },
    { name: 'Store', href: '/products' },
  ],
};

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [activeNav, setActiveNav] = useState('');

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const handleNavClick = (navItem) => {
    setActiveNav(navItem);
  };

  return (
    <div className="bg-black">
      <header className="relative bg-black z-50">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center ml-100">
              <Image src="/logoWeb.svg" alt="logo" width={50} height={50} />
            </div>

            {/* Main navigation */}
            <PopoverGroup className="hidden lg:flex lg:gap-x-8 z-50">
              {navigation.categories.map((category) => (
                <Popover key={category.name} className="flex">
                  <div className="relative flex">
                    <PopoverButton
                      className={`relative z-10 flex items-center pt-px text-sm font-medium ${
                        activeNav === category.name ? 'text-white' : 'text-gray-400'
                      } hover:text-white transition-colors`}
                      onClick={() => handleNavClick(category.name)}
                    >
                      {category.name}
                    </PopoverButton>
                  </div>

                  {/* Panel - Modified to shift content right */}
                  <PopoverPanel className="absolute inset-x-0 top-full text-sm text-gray-400 z-0 pointer-events-none">
                    <div className="absolute inset-0 top-1/2 bg-black shadow-sm" />
                    <div className="relative bg-black pointer-events-auto">
                      <div className="mx-auto max-w-7xl px-8">
                        <div className="grid grid-cols-5 gap-x-8 gap-y-10 py-16">
                          {/* Empty column to push content right */}
                          <div className="col-span-1"></div>
                          
                          {/* Featured products column */}
                          <div className="col-span-2 grid grid-cols-2 gap-x-8">
                            {category.featured.map((item) => (
                              <div key={item.name} className="group relative text-base sm:text-sm">
                                <div className="aspect-square w-full rounded-lg bg-gray-800 overflow-hidden">
                                  {category.id === 'premium-products' && item.href ? (
                                    <Link href={item.href}>
                                      <img
                                        alt={item.imageAlt}
                                        src={item.imageSrc}
                                        className="object-cover w-full h-full cursor-pointer"
                                      />
                                    </Link>
                                  ) : (
                                    <img
                                      alt={item.imageAlt}
                                      src={item.imageSrc}
                                      className="object-cover w-full h-full"
                                    />
                                  )}
                                </div>
                                <p className="mt-6 block font-medium text-white">
                                  {item.name}
                                </p>
                              
                              </div>
                            ))}
                          </div>
                          
                          {/* Product categories column - shifted right */}
                          <div className="col-span-2">
                            {category.sections.map((section) => (
                              <div key={section.name} className="ml-8">
                                <p className="font-medium text-white mb-6">{section.name}</p>
                                <ul className="space-y-4">
                                  {section.items.map((item) => (
                                    <li key={item.name}>
                                      <Link
                                        href={item.href}
                                        className="block text-gray-400 hover:text-white transition-colors"
                                        onClick={addToCart}
                                      >
                                        {item.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverPanel>
                </Popover>
              ))}

              {/* Static Pages */}
              {navigation.pages.map((page) => (
                <Link
                  key={page.name}
                  href={page.href}
                  className={`text-sm font-medium ${
                    activeNav === page.name ? 'text-white' : 'text-gray-400'
                  } hover:text-white transition-colors`}
                  onClick={() => handleNavClick(page.name)}
                >
                  {page.name}
                </Link>
              ))}
            </PopoverGroup>

            {/* Cart */}
            <div className="flex items-center space-x-4">
              <button
                onClick={addToCart}
                className="ml-4 p-2 text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-sm font-medium">{cartCount > 0 ? cartCount : ''}</span>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}