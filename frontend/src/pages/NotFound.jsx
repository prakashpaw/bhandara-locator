import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif", textAlign: 'center', padding: '20px'
    }}>
      <div style={{ fontSize: '5rem', marginBottom: '16px' }}>🍛</div>
      <h1 style={{
        fontFamily: "'Syne', sans-serif", fontSize: '5rem', fontWeight: 800,
        color: 'var(--saffron)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '8px'
      }}>404</h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--muted)', marginBottom: '8px', fontWeight: 300 }}>
        Looks like this bhandara doesn't exist.
      </p>
      <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '32px', fontWeight: 300 }}>
        The page you're looking for has been moved or never existed.
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'var(--saffron)', color: 'var(--deep)', border: 'none',
            padding: '12px 24px', borderRadius: '10px', fontFamily: "'Syne', sans-serif",
            fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s'
          }}
        >
          🗺️ Go to Map
        </button>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'transparent', color: 'var(--text)',
            border: '1px solid var(--border)', padding: '12px 24px',
            borderRadius: '10px', fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s'
          }}
        >
          ← Go Back
        </button>
      </div>
    </div>
  )
}

export default NotFound
