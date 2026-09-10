"use client"

import * as React from "react"
import Link from 'next/link'
import { clsx } from 'clsx'
import { cn } from "@/lib/utils"

// Legacy Button component for backward compatibility
const LegacyButton = ({ icon = <></>, onClick, href, badge, ...props }) => {
  const button = (
    <button
      onClick={onClick}
      className="relative text-white font-bold py-2 px-3 cursor-pointer"
      {...props}
    >
      {icon}
      {badge > 0 && (
        <span className={clsx(
          'absolute -top-1 -right-1 rounded-full bg-[var(--color-primary)] text-white text-[10px] w-5 h-5 flex items-center justify-center'
        )}>
          {badge}
        </span>
      )}
    </button>
  )

  return href ? <Link href={href}>{button}</Link> : button
}

// New shadcn/ui compatible Button component
const ModernButton = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "button"
  
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  }
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  }
  
  const buttonProps = {
    className: cn(baseClasses, variants[variant], sizes[size], className),
    ref,
    ...props,
  }
  
  return <Comp {...buttonProps} />
})
ModernButton.displayName = "Button"

// Main Button component that detects which API to use
const Button = React.forwardRef((props, ref) => {
  // If it has legacy props (icon, badge, href), use LegacyButton
  if (props.icon !== undefined || props.badge !== undefined || props.href !== undefined) {
    return <LegacyButton {...props} ref={ref} />
  }
  
  // Otherwise use ModernButton
  return <ModernButton {...props} ref={ref} />
})
Button.displayName = "Button"

export { Button }
export default Button