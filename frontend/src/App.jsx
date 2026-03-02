import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BhandaraList from './pages/BhandaraList'
import AddBhandara from './pages/AddBhandara'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<BhandaraList />} />
        <Route path="/add" element={<AddBhandara />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App