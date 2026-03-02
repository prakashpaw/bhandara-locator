import { useEffect, useState } from 'react'
import BhandaraCard from '../components/BhandaraCard'
import '../styles/BhandaraList.css'

function BhandaraList() {
  const [bhandaras, setBhandaras] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/bhandaras')
      .then(res => res.json())
      .then(data => setBhandaras(data))
      .catch(err => console.error('Error:', err))
  }, [])

  return (
    <div className="list-page">
      <h2>🍽️ All Bhandaras</h2>
      <div className="card-grid">
        {bhandaras.map((b) => (
          <BhandaraCard key={b.id} bhandara={b} />
        ))}
      </div>
    </div>
  )
}

export default BhandaraList