import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--lofi-button-radius)] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--lofi-button-bg)] text-[var(--lofi-button-text)] hover:bg-[var(--lofi-button-hover)] shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-[var(--lofi-border)] bg-transparent shadow-sm hover:bg-[var(--lofi-card-hover)] text-[var(--lofi-text-primary)]",
        secondary:
          "bg-[var(--lofi-card-hover)] text-[var(--lofi-text-primary)] shadow-sm hover:bg-[var(--lofi-card)]",
        ghost: "hover:bg-[var(--lofi-card-hover)] text-[var(--lofi-text-primary)]",
        link: "text-[var(--lofi-accent)] underline-offset-4 hover:underline",
        accent: "bg-[var(--lofi-accent)] text-[var(--lofi-accent-text)] hover:bg-[var(--lofi-accent-hover)] shadow-sm",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-[var(--lofi-button-radius)] px-3 text-xs",
        lg: "h-10 rounded-[var(--lofi-button-radius)] px-8",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
