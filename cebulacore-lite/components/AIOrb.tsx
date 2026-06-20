"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const sizes = {
  sm: { box: 40, ring: 56 },
  md: { box: 72, ring: 104 },
  lg: { box: 160, ring: 220 },
  xl: { box: 280, ring: 380 },
};

export function AIOrb({
  size = "md",
  active = true,
  className,
}: {
  size?: keyof typeof sizes;
  active?: boolean;
  className?: string;
}) {
  const { box, ring } = sizes[size];

  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: ring, height: ring }}>
      {/* outer soft bloom */}
      <div
        className="absolute rounded-full blur-2xl"
        style={{
          width: ring,
          height: ring,
          background:
            "radial-gradient(circle at 35% 30%, rgba(37,99,235,0.55), rgba(124,58,237,0.35) 45%, transparent 75%)",
        }}
      />
      {/* rotating conic ring */}
      <motion.div
        className="absolute rounded-full opacity-70"
        style={{
          width: ring * 0.86,
          height: ring * 0.86,
          background:
            "conic-gradient(from 0deg, #2563EB, #7C3AED, #A855F7, #EC4899, #2563EB)",
          maskImage: "radial-gradient(circle, transparent 62%, black 64%, black 70%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(circle, transparent 62%, black 64%, black 70%, transparent 72%)",
        }}
        animate={active ? { rotate: 360 } : {}}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      />
      {/* counter-rotating thin ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: ring * 0.62,
          height: ring * 0.62,
          background: "conic-gradient(from 90deg, transparent, #60A5FA, transparent 40%)",
          maskImage: "radial-gradient(circle, transparent 78%, black 80%, black 86%, transparent 88%)",
          WebkitMaskImage: "radial-gradient(circle, transparent 78%, black 80%, black 86%, transparent 88%)",
        }}
        animate={active ? { rotate: -360 } : {}}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      {/* core sphere */}
      <motion.div
        className="relative rounded-full shadow-glow"
        style={{
          width: box,
          height: box,
          background:
            "radial-gradient(circle at 32% 28%, #ffffff 0%, #93c5fd 12%, #7C3AED 55%, #1e1b4b 100%)",
        }}
        animate={active ? { scale: [1, 1.04, 1] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-0 rounded-full mix-blend-screen opacity-80"
          style={{
            background: "radial-gradient(circle at 70% 75%, rgba(236,72,153,0.55), transparent 60%)",
          }}
        />
      </motion.div>
    </div>
  );
}
