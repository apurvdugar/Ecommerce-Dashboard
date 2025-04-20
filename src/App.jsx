import { useState } from 'react'
import './styles/App.css'
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<HomePage/>}></Route>
          </Route>
          <Route path='/products' element={<Layout/>}>
            <Route index element={<ProductsPage/>}></Route>
          </Route>
          <Route path='/products/:productId' element={<Layout />}>
            <Route index element={<ProductDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
