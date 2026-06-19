"use client";

import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/form-elements";
import { mockChatMessages, suggestedQuestions } from "@/data/mock";
import { Bot, User, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const aiResponses: Record<string, string> = {
  default: "That's a great question about cloud architecture. Based on your requirements, I'd recommend a microservices approach with container orchestration. For most use cases, starting with AWS EKS or GCP GKE gives you excellent scalability. Would you like me to break down the specific services needed?",
  kubernetes: "Comparing Kubernetes offerings: AWS EKS is the most mature with deep AWS service integration. GKE (Google's offering) tends to have the fastest Kubernetes version support since Google created K8s. Azure AKS offers tight integration with Azure AD for enterprise identity. If you're already on Azure, AKS is the natural choice. For pure Kubernetes capabilities, GKE edges out the competition.",
  database: "For real-time analytics, I'd point you toward: **Streaming**: Apache Kafka on Confluent Cloud or AWS MSK. **Processing**: Apache Flink or AWS Kinesis Data Analytics. **Storage**: BigQuery (GCP) for analytical workloads, or Amazon Redshift/Azure Synapse. ClickHouse is worth evaluating for sub-second query performance at lower cost.",
};

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>(mockChatMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (content: string) => {
    if (!content.trim() || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content, timestamp: new Date() };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const lc = content.toLowerCase();
      let reply = aiResponses.default;
      if (lc.includes("kubernetes") || lc.includes("k8s")) reply = aiResponses.kubernetes;
      if (lc.includes("database") || lc.includes("analytics")) reply = aiResponses.database;

      const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: reply, timestamp: new Date() };
      setMessages(m => [...m, assistantMsg]);
      setLoading(false);
    }, 1200);
  };

  return (
    <DashboardLayout title="AI Assistant">
      <div className="max-w-3xl mx-auto h-[calc(100vh-9rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 p-4 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          <div className="h-10 w-10 rounded-xl gradient-bg flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-[var(--foreground)]">CebulaCore AI Assistant</p>
            <p className="text-xs text-emerald-500 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online — Ready to help
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 py-2 scrollbar-hide">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
              <div className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                msg.role === "assistant" ? "gradient-bg" : "bg-[var(--muted)] border border-[var(--border)]"
              )}>
                {msg.role === "assistant" ? <Bot className="h-4 w-4 text-white" /> : <User className="h-4 w-4 text-[var(--foreground)]" />}
              </div>
              <div className={cn(
                "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed",
                msg.role === "assistant"
                  ? "bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)]"
                  : "gradient-bg text-white"
              )}>
                {msg.content}
                <p className={cn("text-xs mt-2 opacity-60")}>
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-[var(--card)] border border-[var(--border)] p-4 rounded-2xl">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="h-2 w-2 rounded-full bg-[var(--muted-foreground)] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggested questions */}
        {messages.length <= 1 && (
          <div className="py-3">
            <p className="text-xs text-[var(--muted-foreground)] mb-2 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Suggested questions
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-indigo-500 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="border-t border-[var(--border)] pt-4">
          <div className="flex gap-3">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about cloud architecture, costs, or best practices..."
              className="flex-1 min-h-[52px] max-h-40 resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
            />
            <Button onClick={() => sendMessage(input)} disabled={!input.trim() || loading} size="icon" className="h-[52px] w-[52px]">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-[var(--muted-foreground)] mt-2">Press Enter to send · Shift+Enter for new line · Advisory only, not production guidance</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
