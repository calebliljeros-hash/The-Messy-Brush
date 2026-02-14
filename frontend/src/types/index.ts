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
  id: number;
  title: string;
  // description: string
  price: number;
  artistName: string;
  medium: string;
  imageUrl?: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  status: "available" | "sold" | "reserved";
  artworkDate?: Date;
  owner?: User; // if backend includes owner info
}

// ==============================
// Order (Secondary Content)
// ==============================
export interface Order {
  id: number;
  orderDate?: Date;
  userId: number;
  itemId: number;
  quantity: number;
  paymentMethod?: string;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
  item?: Item;
  user?: User;
}

// ==============================
// API Error
// ==============================
export interface ApiError {
  error: string
  message?: string
}
