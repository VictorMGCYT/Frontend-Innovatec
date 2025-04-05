
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter} from "react-router";
import { Toaster } from 'sonner';
import App from './App.tsx';

// TODO agregar la ruta del register
createRoot(document.getElementById('root')!).render(
  <>
   <BrowserRouter>
    <Toaster richColors />
    <App />
  </BrowserRouter>
  </>
  
)
