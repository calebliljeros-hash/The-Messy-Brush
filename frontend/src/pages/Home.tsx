import { useEffect, useState } from "react"
import { apiRequest } from "../services/api"
import { useAuth } from "../context/AuthContext"

import Hero from "../components/Hero"
import ArtCard from "../components/ArtCard"
import { useNavigate } from "react-router-dom"


interface Item {
  id: number
  title: string
  description: string
  price: number
  imageUrl?: string
}

const Home = () => {
  const [items, setItems] = useState<Item[]>([])
  const [error, setError] = useState("")

  const { isAuthenticated, logout, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await apiRequest("/items")
        setItems(data)
      } catch (err: any) {
        setError(err.message || "Failed to load items")
      }
    }
    fetchItems()
  }, [])

  return (
    <div className="page-container">
      <Hero />

      <header className="gallery-header">
        <h2>Art for Sale</h2>
        {isAuthenticated && (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </header>

      {error && <p className="error-message">{error}</p>}

      {items.length === 0 ? (
        <p className="no-items">No art available yet.</p>
      ) : (
        <div className="art-grid">
          {items.map((item) => (
            <ArtCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              price={item.price}
              imageUrl={item.imageUrl}
              isAuthenticated={!!isAuthenticated}
            />
          ))}
        </div>
      )}

      <footer className="gallery-footer">
        {isAuthenticated && (
            <button onClick={() => navigate("/leavefeedback")}>Feedback</button>
        )}
      </footer>
    </div>
  )
}

export default Home
