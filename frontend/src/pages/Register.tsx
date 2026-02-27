import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { apiRequest } from "../services/api"
import { useAuth } from "../context/AuthContext"
import Footer from "../components/Footer"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth() // ✅ include isAuthenticated

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username || !email || !password) {
      setError("All fields are required.")
      return
    }

    try {
      const data = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      })

      login(data.token, data.user)
      navigate("/")
    } catch (err: any) {
      setError(err.message || "Registration failed")
    }
  }

  return (
    <div className="page-container">
      <h2>Register</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create Account
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>

      <Footer>
        {isAuthenticated && (
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/leavefeedback")}
          >
            Leave Feedback
          </button>
        )}
      </Footer>
    </div>
  )
}

export default Register
