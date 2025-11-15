"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, LogOut, Loader } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
}

interface ChatbotPageProps {
  userName: string
  onLogout: () => void
}

export function ChatbotPage({ userName, onLogout }: ChatbotPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: `안녕하세요! Perso.ai입니다. 저는 AI 영상 더빙 플랫폼에 대해 도와드릴 수 있습니다. 어떤 것을 알고 싶으세요?`,
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://prresso.store"
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) throw new Error("API error")

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: data.reply,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: "죄송합니다. 답변을 가져오는데 오류가 발생했습니다.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full mix-blend-screen filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="border-b border-border/30 bg-card/40 backdrop-blur-md">
          <div className="flex items-center justify-between p-4 md:p-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Image
                  src="/perso.png"
                  alt="Perso.ai Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <h1 className="text-xl md:text-2xl font-bold text-foreground">Perso.ai</h1>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">AI 영상 더빙 어시스턴트</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:inline">{userName}</span>
              <Button
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="border-border/30 hover:bg-card bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">로그아웃</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-card border border-border/30 text-foreground rounded-bl-none"
                }`}
              >
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-card border border-border/30 px-4 py-2 rounded-lg rounded-bl-none">
                <Loader className="w-5 h-5 animate-spin text-primary" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-border/30 bg-card/40 backdrop-blur-md p-4 md:p-6">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="메시지를 입력하세요..."
              disabled={isLoading}
              className="bg-input border-border/30 text-foreground placeholder:text-muted-foreground focus:ring-primary"
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
