import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, TrendingUp, Archive } from "lucide-react"
import { mockBooks, mockBorrowers } from "@/lib/mock-data"
import { BorrowingPolicy } from "@/components/borrowing-policy"

export default function AdminDashboard() {
  const totalBooks = mockBooks.length
  const availableBooks = mockBooks.filter((book) => book.status === "available").length
  const borrowedBooks = mockBooks.filter((book) => book.status === "borrowed").length
  const archivedBooks = mockBooks.filter((book) => book.status === "archived").length
  const totalBorrowers = mockBorrowers.length
  const activeBorrowers = mockBorrowers.filter((borrower) => borrower.status === "active").length

  const stats = [
    {
      title: "Total Books",
      value: totalBooks,
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Available Books",
      value: availableBooks,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Borrowed Books",
      value: borrowedBooks,
      icon: Users,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Archived Books",
      value: archivedBooks,
      icon: Archive,
      color: "text-gray-600",
      bgColor: "bg-gray-100",
    },
  ]

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Overview of your library management system</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BorrowingPolicy />

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New book added: Clean Code</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Book borrowed: Harry Potter</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New borrower registered: Jane Smith</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
