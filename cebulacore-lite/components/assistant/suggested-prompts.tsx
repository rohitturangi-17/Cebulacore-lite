import { suggestedChatPrompts } from "@/lib/mock/data";

export function SuggestedPrompts({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {suggestedChatPrompts.map((prompt) => (
        <button
          key={prompt}
          onClick={() => onSelect(prompt)}
          className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs text-ink-muted transition-colors hover:border-glow-accent/50 hover:text-white"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
