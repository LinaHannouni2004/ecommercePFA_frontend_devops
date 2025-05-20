'use client';

import { useEffect, useState } from "react";
import "./productpage.css";
import { useCart } from '../../components/Card_Produit/CartContext';
import NavigBare from '../../components/NavigBare';
import CartButton from "../../components/Card_Produit/CartButton";
import { createReview,getProductReviews
 } from "../services/reviewService";


import { use } from 'react';
const mockProducts = [
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

const sampleReviews = [
  {
    id: 1,
    productId: 1,
    name: "Photography Pro",
    rating: 5,
    comment: "The autofocus is incredible. 8K video is game-changing.",
    date: "2023-06-15"
  },
  {
    id: 2,
    productId: 1,
    name: "DSLR User",
    rating: 4,
    comment: "Amazing quality but battery life could be better.",
    date: "2023-05-28"
  },
  {
    id: 3,
    productId: 2,
    name: "Developer",
    rating: 5,
    comment: "Compiles code in half the time of my old Intel MacBook.",
    date: "2023-04-10"
  }
];

const getProductDetails = (category) => {
  switch(category) {
    case "Photographie":
      return {
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
      };
    case "Informatique":
      return {
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
      };
    case "Audio":
      return {
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
      };
    default:
      return {
        description: "Premium quality product.",
        features: ["High quality", "Excellent performance"],
        specs: {"Type": "Standard"}
      };
  }
};


export default function ProductPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: ""
  });
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!params?.id) return;

    const fetchData = async () => {
      try {
        const foundProduct = mockProducts.find(p => p.id.toString() === params.id);
        if (!foundProduct) {
          throw new Error("Produit non trouvé");
        }
        
        setProduct(foundProduct);
        
        try {
          const reviewsData = await getProductReviews(params.id);
          setReviews(reviewsData);
        } catch (err) {
          console.error("Erreur chargement avis:", err);
          setReviews([]); // Utiliser un tableau vide si erreur de chargement
        }
        
        if (foundProduct?.sizes) {
          setSelectedSize(foundProduct.sizes[0]);
        }
      } catch (err) {
        console.error("Erreur:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (!newReview.comment.trim()) {
        throw new Error("Le commentaire ne peut pas être vide");
      }

      const reviewPayload = {
        productId: parseInt(params.id),
        userId: user?.id || 1,
        name: newReview.name || "Anonymous",
        rating: newReview.rating,
        comment: newReview.comment
      };

      const savedReview = await createReview(reviewPayload);
      setReviews([{
        ...savedReview,
        date: new Date().toLocaleDateString()
      }, ...reviews]);
      setNewReview({ name: "", rating: 5, comment: "" });
    } catch (err) {
      console.error("Erreur soumission avis:", err);
      setError(err.message || "Erreur lors de la soumission");
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > 10) return;
    setQuantity(newQuantity);
  };

  if (loading) {
    return <div className="loading-container">Chargement...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Erreur: {error}</p>
        <button 
          onClick={() => {
            setError(null);
            setLoading(true);
            // Recharger les données
            const foundProduct = mockProducts.find(p => p.id.toString() === params.id);
            setProduct(foundProduct);
            setLoading(false);
          }}
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (!product) {
    return <div className="error-container">Produit non trouvé</div>;
  }

  const productDetails = getProductDetails(product.category);

  return (
    <div>
    <NavigBare />
    <CartButton />
    <div className="product-page">
            
      
      <div className="product-container">
        <div className="product-card">
        <div className="product-image-container" 
      style={{
        width: "100%",
        height: "400px", // Hauteur fixe pour uniformité
        overflow: "hidden",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5" // Fond neutre si l'image ne couvre pas tout
      }}
    >
      <img 
        src={product.image} 
        alt={product.name} 
        className="product-image"
        style={{
          width: "auto",
          height: "100%",
          maxWidth: "100%",
          objectFit: "contain", // Changez à "cover" si besoin
          objectPosition: "center"
        }}
      />
    </div>

          <div className="product-info">
            <div className="product-header">
              <span className="product-category">{product.category}</span>
              <h1 className="product-title">{product.name}</h1>
            </div>
            
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`star ${i < 4 ? 'filled' : ''}`}>★</span>
                ))}
              </div>
              <span className="rating-value">4.8</span>
              <span className="review-count">({reviews.length} Review{reviews.length !== 1 ? 's' : ''})</span>
            </div>
            
            <div className="product-pricing">
              <span className="current-price">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="original-price">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            
            <p className="product-description">
              {productDetails.description}
            </p>

            {product.sizes && (
              <div className="size-options">
                <h2 className="size-options-title">Size/Options</h2>
                <div className="size-buttons">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

<div className="product-actions">
            <div className="quantity-selector">
              <button 
                onClick={() => handleQuantityChange(quantity - 1)}
                className="quantity-button minus"
              >
                -
              </button>
              <span className="quantity-display">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(quantity + 1)}
                className="quantity-button plus"
              >
                +
              </button>
            </div>
            <button 
              className="add-to-cart-button"
              onClick={() => addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
              })}
            >
              <span className="cart-icon">🛒</span>
              Add To Cart
            </button>
          </div>

            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-icon">#</span>
                <span>SKU: {product.id}</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">📁</span>
                <span>Category: {product.category}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="product-tabs-container">
          <div className="tabs-navigation">
            <button 
              onClick={() => setActiveTab("description")}
              className={`tab-button ${activeTab === "description" ? 'active' : ''}`}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab("additional")}
              className={`tab-button ${activeTab === "additional" ? 'active' : ''}`}
            >
              Specifications
            </button>
            <button 
              onClick={() => setActiveTab("reviews")}
              className={`tab-button ${activeTab === "reviews" ? 'active' : ''}`}
            >
              Reviews ({reviews.length})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "description" && (
              <div className="description-content">
                <h3 className="content-title">Product Details</h3>
                <p className="content-text">
                  {productDetails.description}
                </p>
                
                <div className="features-list">
                  <h4 className="features-title">Key Features</h4>
                  <ul>
                    {productDetails.features.map((feature, index) => (
                      <li key={index} className="feature-item">
                        <span className="feature-icon">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "additional" && (
              <div className="specifications-content">
                <h3 className="content-title">Technical Specifications</h3>
                <div className="specs-grid">
                  {Object.entries(productDetails.specs).map(([key, value]) => (
                    <div key={key} className="spec-item">
                      <div className="spec-key">{key}</div>
                      <div className="spec-value">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="reviews-content">
                <h3 className="content-title">Customer Reviews</h3>
                
                <div className="review-form-container">
                  <h4 className="form-title">Write a Review</h4>
                  <form onSubmit={handleReviewSubmit} className="review-form">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Name (optional)</label>
                      <input
                        type="text"
                        id="name"
                        value={newReview.name}
                        onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                        className="form-input"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Rating</label>
                      <div className="rating-selector">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({...newReview, rating: star})}
                            className={`rating-star ${star <= newReview.rating ? 'selected' : ''}`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="comment" className="form-label">Review</label>
                      <textarea
                        id="comment"
                        value={newReview.comment}
                        onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
        
                        className="form-textarea"
                        required
                      />
                    </div>
                    
                    <button type="submit" className="submit-review-button">
                      Submit Review
                    </button>
                  </form>
                </div>
                
                <div className="reviews-list">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="review-item">
                        <div className="review-header">
                          <div className="review-rating">
                            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                          </div>
                          <div className="review-meta">
                            <span className="review-author">{review.name}</span>
                            <span className="review-date">{review.date}</span>
                          </div>
                        </div>
                        <p className="review-text">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="no-reviews">No reviews yet. Be the first to review!</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}