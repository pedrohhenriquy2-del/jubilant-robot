import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import TrustBadges from "./components/TrustBadges";
import Products from "./components/Products";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFloatButton from "./components/WhatsAppFloatButton";

function App() {
  return (
    <>
      <a
        href={`${import.meta.env.BASE_URL}mix-01.html`}
        className="block bg-ink px-4 py-2.5 text-center text-xs md:text-sm font-medium text-cream"
      >
        Black Friday · Frete grátis · Sérum Mix-01 por R$ 49,90. Ver oferta →
      </a>
      <Header />
      <main>
        <Hero />
        <Products />
        <TrustBadges />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloatButton />
    </>
  );
}

export default App;
