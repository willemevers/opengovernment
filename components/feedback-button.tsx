"use client"

import { MessageSquare } from "lucide-react"

export function FeedbackButton() {
  return (
    <a
      href="https://overheidsdashboard.featurebase.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-foreground text-background px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 font-medium"
    >
      <MessageSquare className="h-5 w-5" />
      <span>Feedback</span>
    </a>
  )
}
