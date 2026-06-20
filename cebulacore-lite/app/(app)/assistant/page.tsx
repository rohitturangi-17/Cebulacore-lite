"use client";
import { useState } from "react";
import { ChatInterface } from "@/components/ChatInterface";
import { useAppStore } from "@/lib/store";
import { api } from "@/lib/api";
import { suggestedChatQuestions } from "@/lib/mock-data";

export default function AssistantPage() {
  const { chatMessages, addChatMessage } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSend(text: string) {
    const userMsg = {
      id: `msg_${Date.now()}_u`,
      role: "user" as const,
      content: text,
      timestamp: new Date().toISOString(),
    };
    addChatMessage(userMsg);
    setIsLoading(true);
    try {
      const res = await api.sendChatMessage({ message: text, history: chatMessages });
      addChatMessage({
        id: `msg_${Date.now()}_a`,
        role: "assistant",
        content: res.reply,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="glass -mx-4 -my-6 h-[calc(100vh-4rem)] overflow-hidden rounded-none sm:-mx-6 sm:rounded-xl2 lg:-mx-8">
      <ChatInterface
        messages={chatMessages}
        onSend={handleSend}
        isLoading={isLoading}
        suggestedQuestions={suggestedChatQuestions}
      />
    </div>
  );
}
