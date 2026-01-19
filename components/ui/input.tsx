import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-[var(--lofi-button-radius)] border border-[var(--lofi-border)] bg-[var(--lofi-card-hover)] px-3 py-1 text-sm text-[var(--lofi-text-primary)] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--lofi-text-primary)] placeholder:text-[var(--lofi-text-secondary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--lofi-accent)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
