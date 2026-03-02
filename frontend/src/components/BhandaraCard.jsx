import '../styles/BhandaraList.css'

function BhandaraCard({ bhandara }) {
  return (
    <div className="card">
      <h3>{bhandara.name}</h3>
      <p>{bhandara.description}</p>
      <p>📅 {bhandara.date} &nbsp; ⏰ {bhandara.time}</p>
      <p>📍 {bhandara.address}</p>
      <p>📞 {bhandara.contact}</p>
    </div>
  )
}

export default BhandaraCard