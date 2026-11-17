import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ProductPage from "./components/ProductPage.jsx";

const raiz = document.getElementById("root");
createRoot(raiz).render(
  <StrictMode>
    <ProductPage codigo={raiz.dataset.produto} />
  </StrictMode>,
);
