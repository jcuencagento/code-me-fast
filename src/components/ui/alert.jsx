import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "src/lib/utils"

const alertVariants = cva(
    "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
    {
        variants: {
            variant: {
                default: "bg-yellow-200 border-pink-300 text-foreground text-md",
                destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
                improve: "bg-orange-200 border-orange-200 hover:bg-orange-200/80",
                great: "bg-green-400 border-green-400 hover:bg-green-400/80"
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props} />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  // eslint-disable-next-lin
  <h5
    ref={ref}
    className={cn("mb-1 text-base font-bold leading-none tracking-tight", className)}
    {...props} />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-base font-semibold [&_p]:leading-relaxed", className)}
    {...props} />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
