// src/usePrompt.ts
import { useBlocker } from "react-router-dom"
import { useEffect, useState, useCallback } from "react"

export interface UsePromptOptions {
  when: boolean
  beforeUnload?: boolean
}

export interface UsePromptReturn {
  showPrompt: boolean
  handleConfirm: () => void
  handleCancel: () => void
}

export function usePrompt({
  when,
  beforeUnload = true,
}: UsePromptOptions): UsePromptReturn {
  const [showPrompt, setShowPrompt] = useState(false)

  const blocker = useBlocker((tx) => {
    if (when) {
      setShowPrompt(true)
      return true
    }
    return false
  })

  const handleConfirm = useCallback(() => {
    setShowPrompt(false)
    blocker.proceed?.()
  }, [blocker])

  const handleCancel = useCallback(() => {
    setShowPrompt(false)
    blocker.reset?.()
  }, [blocker])

  // support beforeunload
  useEffect(() => {
    if (!beforeUnload || !when) return

    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ""
    }

    window.addEventListener("beforeunload", handler)
    return () => {
      window.removeEventListener("beforeunload", handler)
    }
  }, [when, beforeUnload])

  return {
    showPrompt,
    handleConfirm,
    handleCancel,
  }
}
