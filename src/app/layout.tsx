import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RoleProvider } from "@/contexts/role-context";
import { AuthProvider } from "@/contexts/authcontext";
import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Coup - Library Management System",
  description:
    "A modern library management system for efficient book borrowing and administration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <RoleProvider>
            <div className="min-h-screen bg-gray-50">
              <Navigation />
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </main>
            </div>
            <Toaster />
          </RoleProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
