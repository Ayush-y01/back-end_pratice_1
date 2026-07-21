import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />  
      <Home />
    </div>
  )
}

export default App
