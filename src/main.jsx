import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { trackProductClick } from './constants'

// O checkout-yampi.js intercepta o clique antes do React; ele chama esta função
// para o Meta receber o InitiateCheckout com produto e valor.
window.seluneTrackCheckout = (a) => trackProductClick({ currentTarget: a })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
