import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/authcontext'

import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import LeaveFeedback from './pages/leavefeedback'

const App = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected route */}
      <Route
        path="/leavefeedback"
        element={
          isAuthenticated ? <LeaveFeedback /> : <Navigate to="/login" />
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
