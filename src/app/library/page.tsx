"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/ui/status-badge"
import { CategoryDropdown } from "@/components/ui/category-dropdown"
import { BorrowingPolicy } from "@/components/borrowing-policy"
import { mockBooks } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"
import { Search, BookOpen } from "lucide-react"
import { toast } from "sonner"

export default function LibraryPage() {
  const [books, setBooks] = useState(mockBooks)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const availableBooks = books.filter(
    (book) =>
      book.status === "available" &&
      (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === "all" || book.category === categoryFilter),
  )

  const handleBorrow = (bookId: string) => {
    const book = books.find((b) => b.id === bookId)

    // Simulate borrowing logic
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? {
              ...b,
              status: "borrowed" as const,
              borrowedBy: "Current User",
              borrowedDate: new Date().toISOString().split("T")[0],
              dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            }
          : b,
      ),
    )
    toast.success(`Book Borrowed Successfully`, {description: `You have borrowed "${book?.title}". Due date: ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}`,});
  }

  return (
    <ProtectedRoute requiredRole="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Library</h1>
          <p className="text-gray-600">Browse and borrow books from our collection</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Available Books</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search books by title or author..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="w-full sm:w-48">
                    <CategoryDropdown
                      value={categoryFilter}
                      onValueChange={setCategoryFilter}
                      placeholder="Filter by category"
                      includeAll
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableBooks.map((book) => (
                    <Card key={book.id} className="border">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-semibold text-lg">{book.title}</h3>
                            <p className="text-gray-600">by {book.author}</p>
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{book.category}</span>
                            <span>{formatDate(book.publishDate)}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <StatusBadge status={book.status} />
                            <Button
                              size="sm"
                              onClick={() => handleBorrow(book.id)}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <BookOpen className="h-4 w-4 mr-1" />
                              Borrow
                            </Button>
                          </div>

                          <div className="text-xs text-gray-400 font-mono">ID: {book.id}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {availableBooks.length === 0 && (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No books found matching your criteria.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <BorrowingPolicy />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}