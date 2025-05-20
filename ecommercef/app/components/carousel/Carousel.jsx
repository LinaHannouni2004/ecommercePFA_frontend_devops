'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import CarouselItem from './CarouselItem'

const Carousel = () => {
  const [showDetail, setShowDetail] = useState(false)
  const [activeIndex, setActiveIndex] = useState(2) // Start with center item (position 2)
  const carouselRef = useRef(null)
  
  // Product data with images and information
  const products = [
    
    {
      id: 'violet-smartwatch',
      img: '/images/images_carousel/img2.png',
      name: 'Violet Smart Watch',
      price: 199.99,
      description: 'Stay connected with this stylish violet smartwatch. Track your fitness, receive notifications, and more with this versatile wearable.',
      specs: ['24 hours', 'Wireless', 'iOS/Android', '5.0', 'IP68']
    },
    {
      id: 'mauve-earbuds',
      img: '/images/images_carousel/img3.png',
      name: 'Mauve Wireless Earbuds',
      price: 119.99,
      description: 'Unique mauve-colored wireless earbuds with excellent noise isolation and long battery life for uninterrupted listening.',
      specs: ['8 hours', 'Type-C', 'All Devices', '5.2', 'IPX5']
    },
    {
      id: 'black-earbuds',
      img: '/images/images_carousel/img4.png',
      name: 'Black Wireless Earbuds',
      price: 109.99,
      description: 'Sleek black wireless earbuds with deep bass response and comfortable fit for all-day wear.',
      specs: ['7 hours', 'Type-C', 'All Devices', '5.1', 'IPX4']
    },
    {
      id: 'black-headphones',
      img: '/images/images_carousel/img5.png',
      name: 'Black Wireless Headphones',
      price: 179.99,
      description: 'Premium over-ear wireless headphones in black with active noise cancellation for immersive audio experiences.',
      specs: ['30 hours', 'Type-C', 'All Devices', '5.0', 'None']
    },
    {
      id: 'white-earbuds',
      img: '/images/images_carousel/img6.png',
      name: 'White Wireless Earbuds',
      price: 99.99,
      description: 'Classic white wireless earbuds with balanced sound profile and secure fit for active lifestyles.',
      specs: ['5 hours', 'Type-C', 'All Devices', '5.3', 'IPX4']
    },
    {
      id: 'silver-earbuds',
      img: '/images/images_carousel/img1.png',
      name: 'Silver Wireless Earbuds',
      price: 129.99,
      description: 'Experience crystal-clear sound with these sleek silver wireless earbuds. Perfect for on-the-go listening with premium sound quality.',
      specs: ['6 hours', 'Type-C', 'All Devices', '5.3', 'IPX4']
    }
  ]

  const showSlider = useCallback((direction) => {
    if (showDetail) return; 
    
    setActiveIndex(prev => {
      if (direction === 'next') {
        return prev === products.length ? 1 : prev + 1
      } else {
        return prev === 1 ? products.length : prev - 1
      }
    })
  }, [products.length, showDetail])

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    carousel.classList.remove('next', 'prev')
    carousel.classList.add('transition-active')

    const timer = setTimeout(() => {
      carousel.classList.remove('transition-active')
    }, 500)

    return () => clearTimeout(timer)
  }, [activeIndex])

  // Close detail view when active index changes
  useEffect(() => {
    setShowDetail(false)
  }, [activeIndex])

  // Calculate visible positions based on activeIndex
  const getVisiblePositions = () => {
    return products.map((_, index) => {
      const position = index - activeIndex + 3; // Center the active item
      return Math.max(1, Math.min(position, products.length)); // Keep positions between 1-6
    });
  };

  return (
    <div 
      className="carousel" 
      ref={carouselRef}
      style={{ 
        position: 'relative', 
        height: '800px', 
        overflow: 'hidden', 
        marginTop: '-50px' 
      }}
    >
      <div 
        className="list" 
        style={{ 
          position: 'absolute', 
          width: '1140px', 
          maxWidth: '90%', 
          height: '80%', 
          left: '50%', 
          transform: 'translateX(-50%)' 
        }}
      >
        {products.map((product, index) => {
          const position = getVisiblePositions()[index];
          return (
            <CarouselItem 
              key={product.id}
              img={product.img}
              position={position}
              productData={product}
              showDetail={showDetail && position === 2}
              setShowDetail={setShowDetail}
            />
          );
        })}
      </div>
      
      <div 
        className="arrows" 
        style={{ 
          position: 'absolute', 
          bottom: '175px',
          width: '1140px', 
          maxWidth: '90%', 
          display: 'flex', 
          justifyContent: 'space-between', 
          left: '50%', 
          transform: 'translateX(-50%)' 
        }}
      >
        <button 
          id="prev" 
          onClick={() => showSlider('prev')}
          style={{ 
            width: '50px', 
            height: '50px', 
            borderRadius: '50%', 
            background: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            border: 'none',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            opacity: showDetail ? 0 : 1,
            pointerEvents: showDetail ? 'none' : 'auto'
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.8)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.5)'}
        >
          &lt;
        </button>
        
        <button 
          id="next" 
          onClick={() => showSlider('next')}
          style={{ 
            width: '50px', 
            height: '50px', 
            borderRadius: '50%', 
            background: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            border: 'none',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            opacity: showDetail ? 0 : 1,
            pointerEvents: showDetail ? 'none' : 'auto'
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.8)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.5)'}
        >
          &gt;
        </button>
        
        <button 
          id="back" 
          onClick={() => setShowDetail(false)} 
          style={{ 
            position: 'absolute', 
            zIndex: '100', 
            bottom: '0%', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            border: 'none', 
            borderBottom: '1px solid #555', 
            fontFamily: 'Poppins', 
            fontWeight: 'bold', 
            letterSpacing: '3px', 
            backgroundColor: 'transparent', 
            padding: '10px',
            opacity: showDetail ? 1 : 0,
            pointerEvents: showDetail ? 'auto' : 'none',
            transition: 'opacity 0.3s ease',
            cursor: 'pointer'
          }}
        >
          See All ↗
        </button>
      </div>
      
      <style jsx>{`
        .carousel::before {
          width: 500px;
          height: 300px;
          content: '';
          background-image: linear-gradient(70deg, #DC422A, blue);
          position: absolute;
          z-index: -1;
          border-radius: 20% 30% 80% 10%;
          filter: blur(150px);
          top: 50%;
          left: 50%;
          transform: ${showDetail ? 'translate(-100%, -50%) rotate(90deg)' : 'translate(-10%, -50%)'};
          filter: ${showDetail ? 'blur(130px)' : 'blur(150px)'};
          transition: transform 0.5s ease, filter 0.5s ease;
        }
        
        .carousel.showDetail #prev,
        .carousel.showDetail #next {
          opacity: 0;
          pointer-events: none;
        }
        
        .transition-active {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  )
}

export default Carousel