"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";

// Données produits (tous produits, on filtrera les téléphones)
const productsData = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    color: "black",
    price: 1200,
    image: "/iphone14pro.jpg",
    description: "Le dernier iPhone avec une puce A16 Bionic.",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    color: "white",
    price: 999,
    image: "/galaxyS23.jpg",
    description: "Un smartphone puissant avec un écran AMOLED.",
  },
  {
    id: 3,
    name: "MacBook Pro M2",
    color: "gray",
    price: 2200,
    image: "/macbookpro.jpg",
    description: "Ordinateur portable Apple avec puce M2.",
  },
  {
    id: 4,
    name: "Apple Watch Series 9",
    color: "black",
    price: 450,
    image: "/applewatch.jpg",
    description: "Montre connectée avec fonctionnalités santé avancées.",
  },
  {
    id: 5,
    name: "iPad Air",
    color: "blue",
    price: 650,
    image: "/ipadair.jpg",
    description: "Tablette légère et performante.",
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    color: "black",
    price: 349,
    image: "/sonyheadphones.jpg",
    description: "Casque sans fil avec réduction de bruit active.",
  },
  {
    id: 7,
    name: "Dell XPS 13",
    color: "silver",
    price: 1500,
    image: "/dellxps.jpg",
    description: "Ordinateur portable puissant avec écran InfinityEdge.",
  },
];

// 🟢 Filtrer uniquement les produits téléphones
const phoneKeywords = ["iphone", "samsung", "galaxy"];
const phonesOnly = productsData.filter((product) =>
  phoneKeywords.some((kw) => product.name.toLowerCase().includes(kw))
);

export default function PhonesPage() {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(phonesOnly);

  useEffect(() => {
    let filtered = phonesOnly;

    if (minPrice !== "") {
      filtered = filtered.filter((product) => product.price >= parseFloat(minPrice));
    }

    if (maxPrice !== "") {
      filtered = filtered.filter((product) => product.price <= parseFloat(maxPrice));
    }

    if (selectedColor !== "") {
      filtered = filtered.filter(
        (product) => product.color.toLowerCase() === selectedColor.toLowerCase()
      );
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [minPrice, maxPrice, selectedColor, searchTerm]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Téléphones</h1>

      {/* Filtres */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="number"
          placeholder="Prix min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Prix max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Toutes les couleurs</option>
          <option value="black">Noir</option>
          <option value="white">Blanc</option>
          <option value="gray">Gris</option>
          <option value="blue">Bleu</option>
          <option value="silver">Argent</option>
        </select>
        <input
          type="text"
          placeholder="Rechercher un téléphone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Affichage des produits filtrés */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-500">Aucun téléphone ne correspond aux filtres.</p>
        )}
      </div>
    </div>
  );
}
