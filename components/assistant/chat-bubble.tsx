import { cn } from "@/lib/utils";
import { AIOrb } from "@/components/shared/ai-orb";
import type { ChatMessage } from "@/lib/types";

export function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex items-start gap-3", isUser && "flex-row-reverse")}>
      {!isUser && <AIOrb size="sm" />}
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-cebula-gradient text-white"
            : "glass-panel-light text-ink-muted"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
