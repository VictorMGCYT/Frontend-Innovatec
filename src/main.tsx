
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router";
import Login from './routes/Login/Login.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>

    <Routes>
      <Route path='/Login' element={<Login/>}></Route>
    </Routes>

  </BrowserRouter>
)
