"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface SignupPageProps {
  onSignup: (email: string) => void
  onBackToLogin: () => void
}

export function SignupPage({ onSignup, onBackToLogin }: SignupPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다")
      return
    }

    if (password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (email && password) {
      onSignup(email)
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-80 h-80 bg-primary rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent rounded-full mix-blend-screen filter blur-3xl"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 border-border/50 bg-card/80 backdrop-blur">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Perso.ai</h1>
            <p className="text-muted-foreground text-sm">새 계정을 만들어보세요</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">이메일</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-border/30 text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">비밀번호</label>
              <Input
                type="password"
                placeholder="6자 이상 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input border-border/30 text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">비밀번호 확인</label>
              <Input
                type="password"
                placeholder="비밀번호 다시 입력"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-input border-border/30 text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-md text-red-400 text-sm">{error}</div>
            )}

            <Button
              type="submit"
              disabled={isLoading || !email || !password || !confirmPassword}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              {isLoading ? "계정 생성 중..." : "회원가입"}
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-border/30 text-center">
            <p className="text-sm text-muted-foreground mb-3">이미 계정이 있으신가요?</p>
            <Button
              type="button"
              onClick={onBackToLogin}
              variant="outline"
              className="w-full border-border/30 text-foreground hover:bg-primary/10 bg-transparent"
            >
              로그인으로 돌아가기
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
