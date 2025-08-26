"use client"

import type React from "react"
import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CategoryDropdown } from "@/components/ui/category-dropdown"
import { BookIdPreview } from "@/components/book-id-preview"
import { Plus, BookOpen } from "lucide-react"
import { toast } from "sonner"

export default function AddBookPage() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    publishDate: "",
    description: "",
  })
  const [generatedId, setGeneratedId] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.title || !formData.author || !formData.category || !formData.publishDate) {
      toast.error("Validation Error", {
        description: "Please fill in all required fields.",
      });
      return
    }

    // Simulate API call
    console.log("Adding book:", { ...formData, id: generatedId })
    
    toast.success(`Book Added Successfully`, {description: `"${formData.title}" has been added to the library.`,});

    // Reset form
    setFormData({
      title: "",
      author: "",
      isbn: "",
      category: "",
      publishDate: "",
      description: "",
    })
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Book</h1>
          <p className="text-gray-600">Add a new book to your library collection</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Book Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter book title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    placeholder="Enter author name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="isbn">ISBN</Label>
                  <Input
                    id="isbn"
                    value={formData.isbn}
                    onChange={(e) => handleInputChange("isbn", e.target.value)}
                    placeholder="Enter ISBN"
                  />
                </div>

                <div>
                  <Label>Category *</Label>
                  <CategoryDropdown
                    value={formData.category}
                    onValueChange={(value) => handleInputChange("category", value)}
                    placeholder="Select category"
                  />
                </div>

                <div>
                  <Label htmlFor="publishDate">Publish Date *</Label>
                  <Input
                    id="publishDate"
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => handleInputChange("publishDate", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Enter book description"
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Add Book
                </Button>
              </form>
            </CardContent>
          </Card>
s
          <BookIdPreview
            title={formData.title}
            publishDate={formData.publishDate}
            category={formData.category}
            onIdGenerated={setGeneratedId}
          />
        </div>
      </div>
    </ProtectedRoute>
  )
}
