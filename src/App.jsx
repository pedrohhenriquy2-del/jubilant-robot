import Header from "./components/Header";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Benefits from "./components/Benefits";
import Reviews from "./components/Reviews";
import About from "./components/About";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import WhatsAppFloatButton from "./components/WhatsAppFloatButton";

// Ordem da página: atenção (banner) → interesse (produtos) → desejo (kits) →
// confiança (diferenciais, avaliações, sobre, dúvidas, entrega) → compra (carrinho).
function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Products />
        <Benefits />
        <Reviews />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloatButton esconderEm="#produtos" />
    </>
  );
}

export default App;
