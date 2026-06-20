"use client";

import { useRef, useState, useEffect } from "react";
import { Send } from "lucide-react";
import { AIOrb } from "@/components/shared/ai-orb";
import { ChatBubble } from "./chat-bubble";
import { SuggestedPrompts } from "./suggested-prompts";
import { Button } from "@/components/ui/button";
import { sendChatMessage } from "@/lib/api";
import type { ChatMessage } from "@/lib/types";

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  async function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setThinking(true);

    const reply = await sendChatMessage(trimmed, messages);
    setMessages((prev) => [...prev, reply]);
    setThinking(false);
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-[calc(100vh-140px)] flex-col">
      {isEmpty ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
          <AIOrb size="lg" state="idle" />
          <div>
            <h1 className="font-display text-2xl font-semibold text-white">Ask Cebula anything</h1>
            <p className="mt-2 max-w-md text-sm text-ink-muted">
              About architecture choices, cost tradeoffs, or how providers compare for your use case.
            </p>
          </div>
          <SuggestedPrompts onSelect={handleSend} />
        </div>
      ) : (
        <div ref={scrollRef} className="no-scrollbar flex-1 space-y-5 overflow-y-auto px-1 py-4">
          {messages.map((m) => (
            <ChatBubble key={m.id} message={m} />
          ))}
          {thinking && (
            <div className="flex items-center gap-3">
              <AIOrb size="sm" state="thinking" />
              <div className="glass-panel-light flex items-center gap-1 rounded-2xl px-4 py-3">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-muted" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-muted [animation-delay:0.15s]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-muted [animation-delay:0.3s]" />
              </div>
            </div>
          )}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="glass-panel mt-4 flex items-center gap-2 rounded-full p-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about architecture, cost, or providers..."
          className="flex-1 bg-transparent px-4 text-sm text-white placeholder:text-ink-muted/60 focus:outline-none"
        />
        <Button type="submit" size="icon" disabled={!input.trim() || thinking}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
