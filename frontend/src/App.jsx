import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
// import Login from "./pages/Login"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
