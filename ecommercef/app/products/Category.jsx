'use client';
import Link from "next/link";
import Image from "next/image";

export default function Category() {
  const categories = [
    {
      id: 1,
      title: "Smartwatch",
      description: "Accès rapide aux notifications, appels, messages et plus",
      image: "https://i.pinimg.com/736x/00/22/a9/0022a9eb283ba672c92cdc2db32de556.jpg",
      href: "/products/smartwatch"
    },
    {
      id: 2,
      title: "Home Appliances",
      description: "Appareils électroménagers pour votre maison",
      image: "https://i.pinimg.com/736x/ee/6a/b2/ee6ab2d0dc78dda0ec5e0c0583bf9e72.jpg",
      href: "/products/home-appliances"
    },
    {
      id: 3,
      title: "PC & Laptop",
      description: "Ordinateurs et portables haute performance",
      image: "https://i.pinimg.com/736x/c5/c9/07/c5c90711a23fd61e5fba81c62daac9ca.jpg",
      href: "/products/pc-laptop"
    },
    {
      id: 4,
      title: "headphones & airpods",
      description: "headphones & airpods",
      image: "https://i.pinimg.com/736x/88/9f/ca/889fca9c5c1f6e90d73c3254aace4d2b.jpg",
      href: "/products/headphones"
    },
    {
      id: 5,
      title: "Phone & Tablet",
      description: "Smartphones et tablettes dernière génération",
      image: "https://i.pinimg.com/736x/52/a3/ac/52a3ac8d66f5d853184a0c5b00ce0d33.jpg",
      href: "/products/phones"
    },
    {
      id: 6,
      title: "Accessories",
      description: "Accessoires complémentaires",
      image: "https://i.pinimg.com/736x/73/71/4e/73714ed2ffbe33da5f8b4304f6049bad.jpg",
      href: "/products/accessories"
    }
  ];

  return (
    <section className="py-12 px-4 ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12"
        style={{
          marginTop:"100px",
          paddingBottom:"70px",
        }}
        >Choose your Category</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={category.href}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative h-32 w-32 mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:border-purple-950 transition-all duration-300"
              style={{
                marginLeft:"100px"

              }}
              >
                <Image
                  src={category.image}
                  alt="title"
                  
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <h3 className="font-semibold text-red-800 group-hover:text-white transition-colors"
               style={{
                marginLeft:"100px",
                marginBottom:"100px"

              }}
              >
                {category.title}
              </h3>
             
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}