import type { User } from "./auth-types"

export const mockUsers: User[] = [
  {
    id: "admin-001",
    email: "admin@bookcoup.com",
    name: "Admin User",
    role: "admin",
    phone: "+1234567890",
    joinDate: "2023-01-01",
    status: "active",
    borrowedBooks: [],
  },
  {
    id: "user-001",
    email: "john.doe@email.com",
    name: "John Doe",
    role: "user",
    phone: "+1234567891",
    joinDate: "2023-06-15",
    status: "active",
    borrowedBooks: ["HP-JAN-15-2023-FIC-00002"],
  },
  {
    id: "user-002",
    email: "jane.smith@email.com",
    name: "Jane Smith",
    role: "user",
    phone: "+1234567892",
    joinDate: "2023-08-20",
    status: "active",
    borrowedBooks: [],
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const authService = {
  async login(email: string, password: string): Promise<User> {
    await delay(1000) // Simulate network delay

    const user = mockUsers.find((u) => u.email === email)

    if (!user) {
      throw new Error("User not found")
    }

    // Simple password validation (in real app, this would be hashed)
    if (password !== "password123") {
      throw new Error("Invalid password")
    }

    return user
  },

  async register(data: {
    name: string
    email: string
    password: string
    phone?: string
  }): Promise<User> {
    await delay(1000)

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === data.email)
    if (existingUser) {
      throw new Error("User already exists")
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: data.email,
      name: data.name,
      role: "user",
      phone: data.phone,
      joinDate: new Date().toISOString().split("T")[0],
      status: "active",
      borrowedBooks: [],
    }

    mockUsers.push(newUser)
    return newUser
  },

  async logout(): Promise<void> {
    await delay(500)
    // Clear any stored tokens/session data
  },

  async getCurrentUser(): Promise<User | null> {
    // In a real app, this would validate a stored token
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      return JSON.parse(storedUser)
    }
    return null
  },
}