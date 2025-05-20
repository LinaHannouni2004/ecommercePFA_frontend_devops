// app/page.jsx
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Highlights";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-black">
        <Hero />

      

        <Footer />
      </main>
    </>
  );
}
