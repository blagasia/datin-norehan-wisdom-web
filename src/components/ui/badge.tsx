
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-brand-blush-rose text-brand-dark hover:bg-brand-blush-rose/80",
        secondary:
          "border-transparent bg-brand-sage-mist text-brand-dark hover:bg-brand-sage-mist/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-brand-blush-rose/50",
        taupe: "border-transparent bg-brand-gilded-gold text-white hover:bg-brand-gilded-gold/80",
        teal: "border-transparent bg-brand-deep-teal text-white hover:bg-brand-deep-teal/80",
        lavender: "border-transparent bg-brand-lavender text-brand-dark hover:bg-brand-lavender/80",
        amber: "border-transparent bg-brand-amber text-brand-dark hover:bg-brand-amber/80",
        loyalty: "border-transparent bg-gradient-to-r from-brand-gilded-gold to-brand-deep-teal text-white hover:opacity-90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
