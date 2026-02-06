import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { apiRequest } from '../services/api'
import { useAuth } from '../context/authcontext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      login(data.token, data.user)
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <div>
      <h2>Login</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}

export default Login
