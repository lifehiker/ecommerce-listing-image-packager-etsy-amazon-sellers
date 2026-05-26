import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
};

const variants = {
  primary: "bg-neutral-950 text-white hover:bg-neutral-800 border-neutral-950",
  secondary: "bg-white text-neutral-950 hover:bg-neutral-100 border-neutral-300",
  ghost: "bg-transparent text-neutral-700 hover:bg-neutral-100 border-transparent",
  danger: "bg-red-600 text-white hover:bg-red-700 border-red-600",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
  icon: "h-10 w-10 px-0",
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md border font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  ...props
}: React.ComponentProps<typeof Link> & Pick<ButtonProps, "variant" | "size">) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md border font-medium transition-colors",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
