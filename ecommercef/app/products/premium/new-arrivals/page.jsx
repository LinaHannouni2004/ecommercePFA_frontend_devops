'use client'
import { useState, useEffect } from 'react';
import ProductCard from '../../../components/Card_Produit/ProductCard';
import Link from 'next/link';
import NavigBare from '../../../components/NavigBare';
import { FiChevronRight, FiX, FiFilter, FiCheck, FiShoppingCart, FiStar } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../../components/Card_Produit/CartContext';
import './premium-styles.css';

const NewarrivalsProducts = [
  
  {
    id: 1,
    name: "Apple iMac 27\", 1TB HDD, Retina 5K Display, M3 Max",
    price: 1699,
    originalPrice: 1999,
    discount: "Up to 35% off",
    rating: 5.0,
    reviews: 455,
    delivery: "Fast Delivery",
    priceTag: "Best Price",
    image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg",
    category: "Computers",
    sizes: ["Standard", "With Magic Keyboard", "Full Setup"],
    description: "The Apple iMac 27\" with Retina 5K display delivers stunning visuals and powerful performance.",
    features: [
      "Retina 5K display",
      "M3 Max chip",
      "1TB SSD storage",
      "12-core CPU",
      "38-core GPU"
    ],
    specs: {
      "Display": "27-inch 5K Retina",
      "Processor": "M3 Max 12-core",
      "Memory": "32GB unified",
      "Storage": "1TB SSD",
      "Ports": "Thunderbolt 4, USB-C"
    }
  },
  {
    id: 2,
    name: "Apple iPhone 15 Pro Max, 256GB, Blue Titanium",
    price: 1199,
    originalPrice: 1299,
    discount: "Up to 15% off",
    rating: 4.9,
    reviews: 1233,
    delivery: "Best Seller",
    priceTag: "Best Price",
    image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-dark.svg",
    category: "Phones",
    sizes: ["128GB", "256GB", "512GB"],
    description: "The iPhone 15 Pro Max features a durable titanium design and powerful camera system.",
    features: [
      "Titanium design",
      "A17 Pro chip",
      "Pro camera system",
      "Face ID",
      "5G connectivity"
    ],
    specs: {
      "Display": "6.7-inch Super Retina XDR",
      "Chip": "A17 Pro",
      "Storage": "256GB",
      "Camera": "Triple 48MP system",
      "Battery": "Up to 29 hours"
    }
  },
  {
    id: 3,
    name: "iPad Pro 13-Inch (M4): XDR Display, 512GB",
    price: 799,
    originalPrice: 899,
    discount: "Up to 35% off",
    rating: 4.9,
    reviews: 879,
    delivery: "Shipping Today",
    priceTag: "Best Price",
    image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-dark.svg",
    category: "Tablets",
    sizes: ["256GB", "512GB", "1TB"],
    description: "The iPad Pro with M4 chip delivers desktop-class performance in a thin and light design.",
    features: [
      "M4 chip",
      "XDR display",
      "Face ID",
      "Thunderbolt port",
      "Apple Pencil support"
    ],
    specs: {
      "Display": "13-inch Liquid Retina XDR",
      "Chip": "M4",
      "Storage": "512GB",
      "Camera": "12MP front and back",
      "Battery": "Up to 10 hours"
    }
  },
  {
    id: 4,
    name: "PlayStation®5 Console - 1TB, PRO Controller",
    price: 499,
    originalPrice: 549,
    discount: "Up to 10% off",
    rating: 4.8,
    reviews: 2957,
    delivery: "Fast Delivery",
    priceTag: "Best Price",
    image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg",
    category: "Gaming",
    sizes: ["Standard", "Digital Edition", "Bundle"],
    description: "Experience lightning-fast loading with an ultra-high speed SSD and immersive 3D audio.",
    features: [
      "4K UHD Blu-ray",
      "120fps support",
      "3D audio",
      "DualSense controller",
      "1TB SSD"
    ],
    specs: {
      "CPU": "AMD Zen 2 (8 cores)",
      "GPU": "AMD RDNA 2 (10.3 TFLOPS)",
      "Memory": "16GB GDDR6",
      "Storage": "1TB SSD",
      "Output": "4K 120Hz"
    }
  },
  {
    id: 5,
    name: "Apple MacBook PRO Laptop with M2 chip",
    price: 2599,
    originalPrice: 2799,
    discount: "Up to 5% off",
    rating: 4.9,
    reviews: 1076,
    delivery: "Fast Delivery",
    priceTag: "Best Price",
    image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro-dark.svg",
    category: "Laptops",
    sizes: ["16GB/512GB", "32GB/1TB", "64GB/2TB"],
    description: "MacBook Pro with M2 chip delivers exceptional performance for professionals.",
    features: [
      "M2 Pro or M2 Max chip",
      "Liquid Retina XDR display",
      "Up to 96GB memory",
      "Long battery life",
      "Advanced thermal system"
    ],
    specs: {
      "Display": "16.2-inch Liquid Retina XDR",
      "Chip": "M2 Max (12-core CPU)",
      "Memory": "32GB unified",
      "Storage": "1TB SSD",
      "Battery": "Up to 22 hours"
    }
  },
  {
    id: 6,
    name: "Apple Watch SE [GPS 40mm], Smartwatch",
    price: 699,
    originalPrice: 799,
    discount: "Up to 20% off",
    rating: 4.7,
    reviews: 387,
    delivery: "Fast Delivery",
    priceTag: "Best Price",
    image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg",
    category: "Wearables",
    sizes: ["40mm", "44mm"],
    description: "Apple Watch SE features the essential Apple Watch experience at a great value.",
    features: [
      "Retina display",
      "Heart rate monitoring",
      "Water resistant",
      "GPS",
      "WatchOS"
    ],
    specs: {
      "Display": "Retina LTPO OLED",
      "Chip": "S8 SiP",
      "Battery": "Up to 18 hours",
      "Water Resistance": "50 meters",
      "Sensors": "Optical heart sensor"
    }
  },
  {
    id: 7,
    name: "Appareil Photo Canon EOS R5",
    price: 3899.99,
    originalPrice: 4299.99,
    discount: "Up to 10% off",
    rating: 4.9,
    reviews: 342,
    delivery: "Fast Delivery",
    priceTag: "Best Price",
    image: "/images/camerasony.jpg",
    category: "Photographie",
    sizes: ["Body Only", "With 24-105mm Lens", "Full Kit"],
    description: "The Canon EOS R5 redefines hybrid camera performance with 45MP sensor and 8K video.",
    features: [
      "45MP Full-Frame CMOS Sensor",
      "8K 30p & 4K 120p Video",
      "Advanced Dual Pixel AF",
      "In-Body Image Stabilization",
      "High-Speed Shooting"
    ],
    specs: {
      "Sensor": "Full-Frame CMOS",
      "Resolution": "45MP",
      "ISO": "100-51200",
      "Video": "8K RAW",
      "LCD": "3.2\" Touchscreen",
      "Weight": "738g"
    }
  },
  {
    id: 8,
    name: "MacBook Pro 16\" M2 Max",
    price: 3499.99,
    originalPrice: 3799.99,
    discount: "Up to 8% off",
    rating: 4.9,
    reviews: 876,
    delivery: "Fast Delivery",
    priceTag: "Best Price",
    image: "/images/macbook.jpg",
    category: "Informatique",
    sizes: ["32GB/1TB", "64GB/2TB", "96GB/4TB"],
    description: "MacBook Pro 16\" with M2 Max delivers unprecedented performance.",
    features: [
      "M2 Max 12-core CPU",
      "38-core GPU",
      "Up to 96GB memory",
      "Liquid Retina XDR",
      "22h battery life"
    ],
    specs: {
      "Processor": "M2 Max 12-core",
      "GPU": "38-core",
      "Memory": "32GB unified",
      "Storage": "1TB SSD",
      "Display": "16.2\" Retina XDR",
      "Ports": "HDMI, Thunderbolt 4"
    }
  },
  {
    id: 9,
    name: "Casque Sony WH-1000XM5",
    price: 399.99,
    originalPrice: 449.99,
    discount: "Up to 12% off",
    rating: 4.8,
    reviews: 1245,
    delivery: "Fast Delivery",
    priceTag: "Best Price",
    image: "/images/headphones.jpg",
    category: "Audio",
    sizes: ["Black", "Silver", "Blue"],
    description: "Sony WH-1000XM5 with industry-leading noise cancellation.",
    features: [
      "Industry-leading ANC",
      "30-hour battery",
      "Auto NC Optimizer",
      "Hi-Res Audio",
      "Multipoint connection"
    ],
    specs: {
      "Driver": "30mm",
      "Frequency": "4Hz-40kHz",
      "ANC": "Yes",
      "Battery": "30 hours",
      "Weight": "250g",
      "Bluetooth": "5.2"
    }
  }
];
const colorOptions = [
  { name: "Noir", value: "black", bg: "bg-gray-900", border: "border-gray-700", text: "text-gray-900" },
  { name: "Blanc", value: "white", bg: "bg-white", border: "border-gray-300", text: "text-gray-700" },
  { name: "Violet", value: "purple", bg: "bg-purple-500", border: "border-purple-600", text: "text-purple-700" },
  { name: "Argent", value: "silver", bg: "bg-gray-300", border: "border-gray-400", text: "text-gray-700" },
];
export default function NewarrivalsPage() {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [colorFilter, setColorFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = NewarrivalsProducts.filter(product => {
    if (colorFilter && !product.colors.includes(colorFilter)) return false;
    if (priceFilter === 'under200' && product.price >= 200) return false;
    if (priceFilter === '200to300' && (product.price < 200 || product.price > 300)) return false;
    if (priceFilter === 'over300' && product.price <= 300) return false;
    return true;
  });

  const clearAllFilters = () => {
    setColorFilter('');
    setPriceFilter('');
  };

  const calculateTotalItems = () => cartItems.reduce((total, item) => total + item.quantity, 0);

  const priceFilters = [
    { id: 'under200', label: 'Moins de 200€' },
    { id: '200to300', label: '200€ - 300€' },
    { id: 'over300', label: 'Plus de 300€' }
  ];

  // Fonction pour vérifier si le produit est déjà dans le panier
  const isInCart = (id) => cartItems.some(item => item.id === id);

  return (
    <div className="premium-page">
      <NavigBare />
      <div className="premium-cart-fixed">
        <Link href="/cart" className="premium-cart-link">
          <div className="relative">
            <FiShoppingCart className="premium-cart-icon" />
            {cartItems.length > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="premium-cart-badge"
              >
                {calculateTotalItems()}
              </motion.span>
            )}
          </div>
        </Link>
      </div>

      <div className="premium-content-container">
        <header className="premium-header rounded-xl mb-12 p-8 text-center">
          <div className="breadcrumb justify-center">
            <Link href="/products" className="breadcrumb-link">
              <FiChevronRight className="breadcrumb-arrow" />
              Retour à l'accueil
            </Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">New products</span>
          </div>
          <h1 className="premium-title">Our new products</h1>
          <p className="premium-subtitle">
           "Discover our new selection for an immersive experience"
          </p>
        </header>

        

        <div className="premium-main-layout">
          <aside className="premium-filter-sidebar">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`premium-filter-container ${isScrolled ? 'premium-filter-scrolled' : ''}`}
            >
              <div className="premium-filter-header">
                <h2 className="premium-filter-title">
                  <FiFilter className="premium-filter-icon" />
                  Filtres
                </h2>
                {(colorFilter || priceFilter) && (
                  <button 
                    onClick={clearAllFilters}
                    className="premium-clear-filters"
                  >
                    <FiX />
                    Tout effacer
                  </button>
                )}
              </div>

              <div className="premium-filter-section">
                <h3 className="premium-filter-section-title">
                  <span className="premium-filter-dot"></span>
                  Couleurs
                </h3>
                <div className="premium-color-grid">
                  {colorOptions.map((color) => (
                    <motion.button
                      key={color.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setColorFilter(colorFilter === color.name ? '' : color.name)}
                      className={`premium-color-option ${colorFilter === color.name ? 'premium-color-selected' : ''}`}
                    >
                      <span className={`premium-color-swatch ${color.bg} ${color.border}`} />
                      <span className="premium-color-name">{color.name}</span>
                      {colorFilter === color.name && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="premium-color-check"
                        >
                          <FiCheck />
                        </motion.span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="premium-filter-section">
                <h3 className="premium-filter-section-title">
                  <span className="premium-filter-dot"></span>
                  Prix
                </h3>
                <div className="premium-price-filters">
                  {priceFilters.map(({id, label}) => (
                    <motion.button
                      key={id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPriceFilter(priceFilter === id ? '' : id)}
                      className={`premium-price-option ${priceFilter === id ? 'premium-price-selected' : ''}`}
                    >
                      <span className="premium-price-dot"></span>
                      {label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </aside>

          <main className="premium-product-grid-container">
            <AnimatePresence>
              {(colorFilter || priceFilter) && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="premium-mobile-active-filters"
                >
                </motion.div>
              )}
            </AnimatePresence>

            {filteredProducts.length > 0 ? (
              <div className="premium-grid">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="premium-card animate-fadeIn"
                  >
                    <div className="premium-card-image-container">
                      <img src={product.image} alt={product.name} className="premium-card-image" />
                      {product.priceTag && (
                        <span className={`premium-badge ${product.priceTag === "Premium" ? 'new-badge' : ''}`}>
                          {product.priceTag}
                        </span>
                      )}
                    </div>
                    <div className="premium-card-content">
                      <h3 className="premium-card-title">{product.name}</h3>
                      <p className="premium-card-price">{product.price}€</p>
                      <p className="premium-card-description">{product.description}</p>
                     
                      <div className="flex justify-end mt-4">
                        <button 
                          onClick={() => {
                            if (isInCart(product.id)) {
                              removeFromCart(product.id);
                            } else {
                              addToCart(product);
                            }
                          }} 
                          className="premium-add-to-cart-button"
                        >
                          {isInCart(product.id) ? 'Retirer du panier' : 'Ajouter au panier'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="premium-no-products-found">Aucun produit trouvé pour ces filtres.</p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
