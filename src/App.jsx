import Header from "./components/Header";
import Hero from "./components/Hero";
import Guidance from "./components/Guidance";
import About from "./components/About";
import Products from "./components/Products";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFloatButton from "./components/WhatsAppFloatButton";

function App() {
  return (
    <>
      <a
        href="#produtos"
        className="block bg-ink px-4 py-2.5 text-center text-xs md:text-sm font-medium text-cream"
      >
        Frete grátis para todo o Brasil · Pix ou cartão · Nota fiscal
      </a>
      <Header />
      <main>
        <Hero />
        <Guidance />
        <Products />
        <Reviews />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloatButton esconderEm="#produtos" />
    </>
  );
}

export default App;
