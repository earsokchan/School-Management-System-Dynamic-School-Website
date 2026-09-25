import Link from "next/link";
import type { ComponentType } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonProps } from "@/components/ui/button";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "navy" | "red" | "gold" | "white" | "outline" | "outlineLight";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  ariaLabel?: string;
  icon?: ComponentType<{ className?: string; size?: number }>;
}

type ButtonVariant = NonNullable<ButtonProps["variant"]>;

const variantMap: Record<
  NonNullable<ButtonLinkProps["variant"]>,
  { variant: ButtonVariant; className?: string }
> = {
  navy: { variant: "default" },
  red: { variant: "default", className: "bg-gold text-white hover:bg-gold-dark hover:text-white" },
  gold: {
    variant: "default",
    className: "bg-gold text-white shadow-sm hover:bg-gold-dark hover:text-white",
  },
  white: {
    variant: "outline",
    className: "border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white",
  },
  outline: {
    variant: "outline",
    className: "border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white",
  },
  outlineLight: { variant: "outline" },
};

export function ButtonLink({
  href,
  children,
  variant = "navy",
  size = "default",
  className,
  ariaLabel,
  icon: Icon,
}: ButtonLinkProps) {
  const { variant: shadcnVariant, className: override } = variantMap[variant];
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(buttonVariants({ variant: shadcnVariant, size }), override, className)}
    >
      {Icon ? <Icon className="h-4 w-4" size={16} aria-hidden="true" /> : null}
      {children}
    </Link>
  );
}