import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import TrustBadges from "./components/TrustBadges";
import Services from "./components/Services";
import Products from "./components/Products";
import Gallery from "./components/Gallery";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFloatButton from "./components/WhatsAppFloatButton";

function App() {
  return (
    <>
      <a
        href={`${import.meta.env.BASE_URL}`}
        className="block bg-ink px-4 py-2.5 text-center text-xs md:text-sm font-medium text-cream"
      >
        Black Friday: Sérum Mix-01 por R$ 17,75 com frete grátis até 01/12. Ver oferta →
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <TrustBadges />
        <Services />
        <Products />
        <Gallery />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloatButton />
    </>
  );
}

export default App;
