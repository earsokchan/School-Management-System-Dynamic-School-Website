import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return <Tag className={cn("container-site", className)}>{children}</Tag>;
}