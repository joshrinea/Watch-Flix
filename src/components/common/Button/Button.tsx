import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  children: ReactNode;
}

export const Button = ({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) => {
  const base =
    "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-md px-5 py-3 text-sm font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6";
  const styles =
    variant === "primary"
      ? "bg-white text-zinc-950 hover:bg-zinc-200"
      : "bg-white/15 text-white backdrop-blur-sm hover:bg-white/25";
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
};
