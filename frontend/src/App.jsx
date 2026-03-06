import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import BhandaraList from './pages/BhandaraList'
import AddBhandara from './pages/AddBhandara'
import About from './pages/About'
import Login from './pages/Login'
import AdminUsers from './pages/AdminUsers'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<BhandaraList />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/add" element={
          <ProtectedRoute><AddBhandara /></ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute><AdminUsers /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App