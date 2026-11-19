import Header from "./components/Header";
import Banner from "./components/Banner";
import Ofertas from "./components/Ofertas";
import Products from "./components/Products";
import Benefits from "./components/Benefits";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import WhatsAppFloatButton from "./components/WhatsAppFloatButton";

// Página curta, de loja que vende todo dia: banner → kits em oferta → garantias
// numa faixa → vitrine → avaliações → dúvidas rápidas.
function App() {
  return (
    <>
      <Header />
      <main>
        <Banner />
        <Ofertas />
        <Benefits />
        <Products />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloatButton esconderEm="#produtos" />
    </>
  );
}

export default App;
