"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export function FloatingAssistantButton() {
  const pathname = usePathname();
  if (pathname?.startsWith("/assistant")) return null;

  return (
    <Link href="/assistant" aria-label="Open AI Assistant">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-glow-primary via-glow-secondary to-accent shadow-glow"
      >
        <span className="absolute inset-0 animate-pulse-glow rounded-full bg-glow-secondary/40 blur-xl" />
        <Bot className="relative h-6 w-6 text-white" />
      </motion.div>
    </Link>
  );
}
