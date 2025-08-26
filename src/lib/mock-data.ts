import type { User, Book, Borrower, BorrowRecord } from "./types";
import bcrypt from "bcryptjs";

export const users: User[] = [
  {
    username: "user",
    password: bcrypt.hashSync("12345678", 10),
    role: "user"
  },
  {
    username: "admin",
    password: bcrypt.hashSync("12345678", 10),
    role: 'admin'
  },
];

export const mockBooks: Book[] = [
  {
    id: "TH-FEB-02-2022-FIC-00001",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fiction",
    publishDate: "2022-02-15",
    isbn: "978-0547928227",
    status: "available",
  },
  {
    id: "HP-JAN-15-2023-FIC-00002",
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    category: "Fiction",
    publishDate: "2023-01-15",
    isbn: "978-0439708180",
    status: "borrowed",
    borrowedBy: "John Doe",
    borrowedDate: "2024-01-15",
    dueDate: "2024-01-22",
  },
  {
    id: "SA-MAR-10-2021-SCI-00003",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "Science",
    publishDate: "2021-03-10",
    isbn: "978-0062316097",
    status: "archived",
  },
  {
    id: "CD-APR-05-2023-TEC-00004",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Technology",
    publishDate: "2023-04-05",
    isbn: "978-0132350884",
    status: "available",
  },
];

export const mockBorrowers: Borrower[] = [
  {
    id: "BRW-001",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1234567890",
    borrowedBooks: ["HP-JAN-15-2023-FIC-00002"],
    joinDate: "2023-06-15",
    status: "active",
  },
  {
    id: "BRW-002",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+1234567891",
    borrowedBooks: [],
    joinDate: "2023-08-20",
    status: "active",
  },
  {
    id: "BRW-003",
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+1234567892",
    borrowedBooks: [],
    joinDate: "2023-05-10",
    status: "suspended",
  },
];

export const mockBorrowRecords: BorrowRecord[] = [
  {
    id: "BR-001",
    bookId: "HP-JAN-15-2023-FIC-00002",
    bookTitle: "Harry Potter and the Sorcerer's Stone",
    borrowerId: "BRW-001",
    borrowerName: "John Doe",
    borrowDate: "2024-01-15",
    dueDate: "2024-01-22",
    status: "active",
  },
];
