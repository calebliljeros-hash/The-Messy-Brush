// ==============================
// User
// ==============================
export interface User {
  id: number
  username: string
  email: string
}

// ==============================
// Auth Response
// ==============================
export interface AuthResponse {
  token: string
  user: User
}

// ==============================
// Item (Primary Content)
// ==============================
export interface Item {
  id: number
  title: string
  description: string
  price: number
  imageUrl?: string
  userId: number
  createdAt: string
  updatedAt: string
  owner?: User // if backend includes owner info
}

// ==============================
// Order (Secondary Content)
// ==============================
export interface Order {
  id: number
  userId: number
  itemId: number
  quantity: number
  createdAt: string
  updatedAt: string
  item?: Item
  user?: User
}

// ==============================
// API Error
// ==============================
export interface ApiError {
  error: string
  message?: string
}
