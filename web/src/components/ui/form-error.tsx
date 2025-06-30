import React from "react";
import { cn } from "@/lib/utils";

interface FormErrorProps {
  message: string | null | undefined;
  className?: string;
}

export function FormError({ message, className }: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm text-destructive opacity-90 mt-1 animate-fadeIn",
        className
      )}
    >
      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-destructive/90 flex items-center justify-center shadow-sm">
        <span className="text-[10px] font-bold text-destructive-foreground">
          !
        </span>
      </div>
      <span>{message}</span>
    </div>
  );
}
