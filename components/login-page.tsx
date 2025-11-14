"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface LoginPageProps {
  onLogin: (email: string) => void
  onSwitchToSignup: () => void
}

export function LoginPage({ onLogin, onSwitchToSignup }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    if (email && password) {
      onLogin(email)
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
            <p className="text-muted-foreground text-sm">AI 영상 더빙 플랫폼에 오신 것을 환영합니다</p>
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
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">비밀번호</label>
              <Input
                type="password"
                placeholder="비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input border-border/30 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border/30 space-y-3">
            <p className="text-xs text-muted-foreground text-center">데모 계정: test@example.com / password</p>
            <Button
              type="button"
              onClick={onSwitchToSignup}
              className="w-full bg-primary/20 hover:bg-primary/30 text-primary font-medium border border-primary/50"
            >
              새 계정 만들기
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
