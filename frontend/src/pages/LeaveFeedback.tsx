import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../services/api'
import { useAuth } from '../context/authcontext'

const LeaveFeedback = () => {
  const [orderId, setOrderId] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { token } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!token) {
      setError('You must be logged in to leave feedback.')
      return
    }

    try {
      await apiRequest(`/feedback/${orderId}`, {
        method: 'POST',
        token,
        body: JSON.stringify({ message }),
      })
      setSuccess('Feedback submitted!')
      setMessage('')
      setOrderId('')
      // Optional: navigate back to home or refresh feedback list
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Failed to submit feedback')
    }
  }

  return (
    <div>
      <h2>Leave Feedback on an Art Item</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Art Item ID</label>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  )
}

export default LeaveFeedback
