import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import TrustBadges from "./components/TrustBadges";
import Services from "./components/Services";
import Products from "./components/Products";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFloatButton from "./components/WhatsAppFloatButton";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <TrustBadges />
        <Services />
        <Products />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloatButton />
    </>
  );
}

export default App;
