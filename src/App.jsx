import { useState } from 'react'
import './styles/App.css'
import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from './pages/HomePage'
import Layout from './components/layout/Layout';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<HomePage/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
