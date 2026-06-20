"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Loader2 } from "lucide-react";
import { ChatMessage } from "@/types";
import { AIOrb } from "@/components/AIOrb";
import { cn } from "@/lib/utils";

export function ChatInterface({
  messages,
  onSend,
  isLoading,
  suggestedQuestions = [],
}: {
  messages: ChatMessage[];
  onSend: (text: string) => void;
  isLoading?: boolean;
  suggestedQuestions?: string[];
}) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setInput("");
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
            <AIOrb size="lg" />
            <div>
              <p className="font-display text-xl font-medium">Hey, I&apos;m Cebula</p>
              <p className="mt-1 text-sm text-muted">Ask me anything about cloud architecture or cost.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => submit(q)}
                  className="glass rounded-full px-4 py-2 text-sm text-white/90 transition-colors hover:bg-white/10"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto flex max-w-2xl flex-col gap-5">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex items-start gap-3", m.role === "user" && "flex-row-reverse")}
                >
                  {m.role === "assistant" && <AIOrb size="sm" />}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      m.role === "user"
                        ? "bg-gradient-to-r from-glow-primary to-glow-secondary text-white"
                        : "glass text-white/90"
                    )}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <div className="flex items-center gap-3">
                <AIOrb size="sm" />
                <div className="glass flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-muted">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Cebula is thinking…
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className="border-t border-white/[0.08] p-4 sm:px-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(input);
          }}
          className="mx-auto flex max-w-2xl items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Cebula about architecture, cost, or providers…"
            className="h-12 flex-1 rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm text-white placeholder:text-muted/60 outline-none focus:border-glow-secondary/60"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-glow-primary to-glow-secondary shadow-glow-sm transition-opacity disabled:opacity-40"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
