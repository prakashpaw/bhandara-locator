import BhandaraCard from '../components/BhandaraCard'
import '../styles/BhandaraList.css'

const bhandaras = [
  {
    id: 1,
    name: "Sai Baba Bhandara",
    description: "Free langar for everyone",
    date: "2024-03-15",
    time: "12:00 PM",
    address: "Nagpur, Maharashtra",
    contact: "9876543210",
  },
  {
    id: 2,
    name: "Ram Navami Bhandara",
    description: "Prasad distribution",
    date: "2024-03-16",
    time: "11:00 AM",
    address: "Wardha Road, Nagpur",
    contact: "9123456780",
  }
]

function BhandaraList() {
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