import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "src/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
                destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-yellow-200",
                button_dark: "bg-secondary text-secondary-foreground shadow-sm font-bold hover:bg-violet-700",
                button_light: "bg-blue-200 text-black-foreground shadow-sm font-bold hover:bg-yellow-100",
                button_neutral: "bg-secondary/70 text-secondary-foreground shadow-sm font-bold hover:bg-violet-300",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                ghost_header: "font-bold hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                game_dark: "hover:bg-violet-700 text-2xl font-bold text-white/80",
                game_light: "hover:bg-yellow-200 text-2xl font-bold text-black/80 hover:text-black/80",
                game_neutral: "hover:bg-violet-300 text-2xl font-bold text-black/70 hover:text-black/80",
                bad: "bg-orange-200 border-orange-200 hover:bg-orange-200/80",
                improve: "bg-green-400 border-green-400 hover:bg-green-400/80",
                great: "bg-blue-500 border-blue-500 hover:bg-blue-500/80",
                wpm: "bg-secondary text-secondary-foreground shadow-sm",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
            },
        },
            defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return ((<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />));
})

Button.displayName = "Button"

export { Button, buttonVariants }
