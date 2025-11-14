"use client"

import { useState } from "react"
import { LoginPage } from "@/components/login-page"
import { SignupPage } from "@/components/signup-page"
import { ChatbotPage } from "@/components/chatbot-page"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const [isSignupMode, setIsSignupMode] = useState(false)

  const handleLogin = (email: string) => {
    setUserName(email.split("@")[0])
    setIsLoggedIn(true)
  }

  const handleSignup = (email: string) => {
    setUserName(email.split("@")[0])
    setIsLoggedIn(true)
    setIsSignupMode(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserName("")
  }

  return (
    <main>
      {!isLoggedIn ? (
        isSignupMode ? (
          <SignupPage onSignup={handleSignup} onBackToLogin={() => setIsSignupMode(false)} />
        ) : (
          <LoginPage onLogin={handleLogin} onSwitchToSignup={() => setIsSignupMode(true)} />
        )
      ) : (
        <ChatbotPage userName={userName} onLogout={handleLogout} />
      )}
    </main>
  )
}
