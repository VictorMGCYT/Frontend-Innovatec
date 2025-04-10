
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter} from "react-router";
import { Toaster } from 'sonner';
import App from './App.tsx';
import { StrictMode } from 'react';

// TODO agregar la ruta del register
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster richColors />
      <App />
    </BrowserRouter>
  </StrictMode>
  
)
