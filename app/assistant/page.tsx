import { AppShell } from "@/components/layout/app-shell";
import { ChatInterface } from "@/components/assistant/chat-interface";

export default function AssistantPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <ChatInterface />
      </div>
    </AppShell>
  );
}
