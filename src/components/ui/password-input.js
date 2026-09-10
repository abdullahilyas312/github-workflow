"use client"

import * as React from "react"
import { Input } from "./Input"
import { FiEye, FiEyeOff } from "react-icons/fi"

export function PasswordInput(props) {
  const [visible, setVisible] = React.useState(false)
  const Type = visible ? "text" : "password"
  return (
    <div className="relative">
      <Input type={Type} {...props} className="pr-16" suppressHydrationWarning={true} />
      <button
        type="button"
        aria-label={visible ? "Hide password" : "Show password"}
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground inline-flex items-center gap-1"
        suppressHydrationWarning={true}
      >
        {visible ? <FiEyeOff className="size-4" /> : <FiEye className="size-4" />}
        {visible ? "Hide" : "Show"}
      </button>
    </div>
  )
}
