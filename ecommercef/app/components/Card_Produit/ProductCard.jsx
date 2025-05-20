'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from './CartContext';
import Image from 'next/image';

export default function ProductCard({ product }) {
  const { addToCart, removeFromCart, isInCart } = useCart();

  const [imgSrc, setImgSrc] = useState(
    product.imageUrl?.startsWith('http') 
      ? product.imageUrl 
      : '/default-product-image.jpg'
  );

  const handleImageError = () => {
    if (imgSrc !== '/default-product-image.jpg') {
      setImgSrc('/default-product-image.jpg');
    }
  };

  const handleCartAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart(product.id)) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <Link 
      href={`/products/${product.id}`}
      className="group block rounded-lg border border-black bg-gray-950 p-4 transition hover:border-gray-600 hover:shadow-lg"
    >
      <div className="relative h-56 w-full mb-4">
      <img
  src={imgSrc}
  alt={product.name}
  className="object-contain mx-auto h-full w-full"
  onError={handleImageError}
/>
        {product.discount && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
        {product.name}
      </h3>

      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-500'}`} 
            fill="currentColor" 
            viewBox="0 0 20 20" 
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        ))}
        <span className="text-sm text-gray-400 ml-1">
          {product.rating} ({product.reviews})
        </span>
      </div>

      <div className="flex flex-wrap gap-3 mb-4 text-gray-400 text-sm">
        {product.delivery && (
          <span className="flex items-center gap-1">
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 00-1-1H4a1 1 0 00-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 01-5 0 2.5 2.5 0 015 0zm-10 0a2.5 2.5 0 01-5 0 2.5 2.5 0 015 0z"/>
            </svg>
            {product.delivery}
          </span>
        )}
        {product.priceTag && (
          <span className="flex items-center gap-1">
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeWidth="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 01-1-1zm8-3.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
            </svg>
            {product.priceTag}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-white">
          {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
        </span>
        <button
          onClick={handleCartAction}
          aria-label={isInCart(product.id) ? `Retirer ${product.name} du panier` : `Ajouter ${product.name} au panier`}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isInCart(product.id)
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isInCart(product.id) ? 'Retirer' : 'Ajouter'}
        </button>
      </div>
    </Link>
  );
}