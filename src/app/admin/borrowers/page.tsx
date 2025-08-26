"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { mockBorrowers } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"
import { Search, Users, UserCheck, UserX } from "lucide-react"
import { toast } from "sonner"

export default function BorrowersPage() {
  const [borrowers, setBorrowers] = useState(mockBorrowers)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBorrowers = borrowers.filter(
    (borrower) =>
      borrower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrower.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrower.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleStatusToggle = (borrowerId: string) => {
    setBorrowers((prev) =>
      prev.map((borrower) =>
        borrower.id === borrowerId
          ? {
              ...borrower,
              status: borrower.status === "active" ? "suspended" : "active",
            }
          : borrower,
      ),
    )

    const borrower = borrowers.find((b) => b.id === borrowerId)
    const newStatus = borrower?.status === "active" ? "suspended" : "active"
    
    
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Borrowers Management</h1>
        <p className="text-gray-600">Manage library members and their borrowing status</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Registered Borrowers</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search borrowers by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Borrower ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Books Borrowed</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBorrowers.map((borrower) => (
                  <TableRow key={borrower.id}>
                    <TableCell className="font-mono text-sm">{borrower.id}</TableCell>
                    <TableCell className="font-medium">{borrower.name}</TableCell>
                    <TableCell>{borrower.email}</TableCell>
                    <TableCell>{borrower.phone}</TableCell>
                    <TableCell>{borrower.borrowedBooks.length}/2</TableCell>
                    <TableCell>{formatDate(borrower.joinDate)}</TableCell>
                    <TableCell>
                      <StatusBadge status={borrower.status} />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusToggle(borrower.id)}
                        className={
                          borrower.status === "active"
                            ? "text-red-600 hover:text-red-700"
                            : "text-green-600 hover:text-green-700"
                        }
                      >
                        {borrower.status === "active" ? (
                          <>
                            <UserX className="h-4 w-4 mr-1" />
                            Suspend
                          </>
                        ) : (
                          <>
                            <UserCheck className="h-4 w-4 mr-1" />
                            Activate
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredBorrowers.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No borrowers found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}