import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "md", className, children, ...props }, ref) => {
    const variants = {
      default: "gradient-bg text-white hover:opacity-90 shadow-lg shadow-indigo-500/25",
      secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--muted)]",
      outline: "border border-[var(--border)] bg-transparent hover:bg-[var(--muted)] text-[var(--foreground)]",
      ghost: "bg-transparent hover:bg-[var(--muted)] text-[var(--foreground)]",
      destructive: "bg-red-500 text-white hover:bg-red-600",
      link: "bg-transparent underline-offset-4 hover:underline text-[var(--primary)] p-0 h-auto",
    };
    const sizes = {
      sm: "h-8 px-3 text-xs rounded-md",
      md: "h-10 px-4 text-sm rounded-lg",
      lg: "h-12 px-6 text-base rounded-lg",
      icon: "h-9 w-9 rounded-lg",
    };
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
