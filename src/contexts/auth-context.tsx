/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { AuthState, LoginCredentials, RegisterData } from "@/lib/auth-types"
import { authService } from "@/lib/auth-mock"
import { toast } from "sonner"

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  useEffect(() => {
    // Check for existing session on mount
    const initAuth = async () => {
      try {
        const user = await authService.getCurrentUser()
        if (user) {
          setAuthState({
            user,
            isLoading: false,
            isAuthenticated: true,
          })
        } else {
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
          })
        }
      } catch (error) {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        })
      }
    }

    initAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      setAuthState((prev: any) => ({ ...prev, isLoading: true }))

      const user = await authService.login(credentials.email, credentials.password)

      // Store user in localStorage (in real app, use secure token storage)
      localStorage.setItem("currentUser", JSON.stringify(user))

      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      })

      toast.success(`Login Successful`, {description: `Welcome back, ${user.name}!`,});
    } catch (error) {
      setAuthState((prev: any) => ({ ...prev, isLoading: false }))

      toast.error("Login Failed", {
        description: error instanceof Error ? error.message : "An error occurred",
      });
      throw error
    }
  }

  const register = async (data: RegisterData) => {
    try {
      setAuthState((prev: any) => ({ ...prev, isLoading: true }))

      if (data.password !== data.confirmPassword) {
        throw new Error("Passwords do not match")
      }

      if (data.password.length < 6) {
        throw new Error("Password must be at least 6 characters")
      }

      const user = await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      })

      // Store user in localStorage
      localStorage.setItem("currentUser", JSON.stringify(user))

      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      })
      toast.success(`Registration Successful`, {description: `Welcome to Book Coup, ${user.name}!`,});
    } catch (error) {
      setAuthState((prev: any) => ({ ...prev, isLoading: false }))

      toast.error("Registration Failed", {
        description: error instanceof Error ? error.message : "An error occurred",
      });
      throw error
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      localStorage.removeItem("currentUser")

      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      })

      toast.success(`Logged Out`, {description: `You have been successfully logged out.`,});
    } catch (error) {
      toast.error("Logout Error", {
        description: "An error occurred while logging out.",
      });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}