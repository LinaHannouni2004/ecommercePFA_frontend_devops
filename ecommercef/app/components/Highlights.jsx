'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState, useEffect } from "react";
import { SamsungVideo, AirpodsVideo } from '../utils';
import Link from "next/link";

const Highlights = () => {
  useGSAP(() => {
    gsap.to('#title', { opacity: 1, y: 0 });
  }, []);

  const [videoSrc, setVideoSrc] = useState(SamsungVideo);
  const [videoSrc1, setVideoSrc1] = useState(AirpodsVideo);

  useEffect(() => {
    const handleResize = () => {
      setVideoSrc(SamsungVideo);
      setVideoSrc1(AirpodsVideo);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sectionTitleStyle = {
    color: "rgb(168, 157, 91)",
    textShadow: "0 0 8px rgba(95, 20, 20, 0.329), 0 0 16px black",
    margin: "20px 0"
  };

  return (
    <>
      {/* Highlights Section */}
      <section id="highlights" className="w-screen overflow-hidden h-full common-padding bg-zinc-800">
        <div className="screen-max-width">
          <div className="mb-12 w-full md:flex items-end justify-between">
            <h1 id="title" className="main-heading">Get the highlights:</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {[{ label: 'Samsung S24', src: videoSrc }, { label: 'Airpods', src: videoSrc1 }].map(({ label, src }, i) => (
              <div key={i} className="flex-1">
                <p className="product-heading" style={sectionTitleStyle}>{label}</p>
                <div className="w-full">
                  <video className="pointer-events-none w-full" autoPlay muted playsInline key={src}>
                    <source src={src} type="video/mp4" />
                  </video>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-zinc-800 text-gray-300 py-16">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-4xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {[ 
                {
                  title: 'Products',
                  links: ['Smartwatch', 'Phones', 'PC-Laptop', 'Home Appliances', 'Headphones', 'Accessories'],
                  path: 'products'
                },
                {
                  title: 'Company',
                  links: ['Who we are', 'Careers', 'Terms & Conditions', 'Privacy'],
                  path: '#about-us' // Link to the "About Us" section
                },
                {
                  title: 'Customer Service',
                  links: ['Contact', 'Shipping', 'Returns', 'Warranty'],
                  path: '/aboutus#footer-section'  // Link to the footer section in About Us page
                }
              ].map(({ title, links, path }) => (
                <div key={title}>
                  <h3 className="text-lg font-medium mb-6 tracking-wide">{title}</h3>
                  <ul className="space-y-3">
                    {links.map(link => (
                      <li key={link}>
                        <Link
                          href={path}  // Correct path to the AboutUs footer section
                          className="text-gray-400 hover:text-white transition-colors duration-200"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-700 mt-16 pt-8 text-center">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} . All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Highlights;
