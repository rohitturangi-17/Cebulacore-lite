"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AIOrb } from "@/components/shared/ai-orb";

export function FloatingAssistantButton() {
  return (
    <Link href="/assistant" className="fixed bottom-6 right-6 z-40">
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative cursor-pointer"
      >
        <AIOrb size="md" state="idle" />
      </motion.div>
    </Link>
  );
}
