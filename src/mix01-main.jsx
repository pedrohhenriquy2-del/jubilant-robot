import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProductSalesPage from './ProductSalesPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductSalesPage />
  </StrictMode>,
)
