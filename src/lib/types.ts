export interface User {
  username: string
  password: string
  role: "user" | "admin"
}
export interface UserRoleType {
  username: string
  role: "user" | "admin"
}
export interface AuthContextProps {
  isLoggedIn: boolean
  logout: () => void
  user: UserRoleType | null
  setUser: (user: UserRoleType | null) => void
}

export interface Book {
  id: string
  title: string
  author: string
  category: string
  publishDate: string
  isbn: string
  status: "available" | "borrowed" | "archived"
  borrowedBy?: string
  borrowedDate?: string
  dueDate?: string
}

export interface Borrower {
  id: string
  name: string
  email: string
  phone: string
  borrowedBooks: string[]
  joinDate: string
  status: "active" | "suspended"
}

export interface BorrowRecord {
  id: string
  bookId: string
  bookTitle: string
  borrowerId: string
  borrowerName: string
  borrowDate: string
  dueDate: string
  returnDate?: string
  status: "active" | "overdue" | "returned"
  overdueAmount?: number
}

export type UserRole = "admin" | "user"

export const BOOK_CATEGORIES = [
  "Fiction",
  "Non-Fiction",
  "Science",
  "History",
  "Biography",
  "Technology",
  "Arts",
  "Philosophy",
  "Religion",
  "Children",
] as const

export type BookCategory = (typeof BOOK_CATEGORIES)[number]