import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import LeaveFeedback from "./pages/LeaveFeedback"
import Purchase from "./pages/purchase" // example if you add this page
import ProtectedRoute from "./components/ProtectedRoute"


const App = () => {
  return (
    <Routes>
      {/* Shared layout */}
      <Route path="/" element={<Layout />} />
      {/* Public */}
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
     

      {/* Protected routes */}
      <Route
        path="/leavefeedback"
        element={
          <ProtectedRoute>
            <LeaveFeedback />
          </ProtectedRoute>
        }
      />

      <Route
        path="/purchase/:id"
        element={
          <ProtectedRoute>
            <Purchase />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
