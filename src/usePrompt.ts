// src/usePrompt.ts
import { useBlocker, type Location } from "react-router-dom"
import { useEffect, useState, useCallback } from "react"

/**
 * Options for configuring the usePrompt hook
 */
export interface UsePromptOptions {
  /**
   * Whether to enable the prompt when the user tries to navigate away.
   */
  when: boolean

  /**
   * Whether to also trigger the browser's native "beforeunload" prompt
   * when the user tries to close the tab or reload the page.
   * Default is true.
   */
  beforeUnload?: boolean

  /**
   * Whether to ignore changes in the URL hash (i.e., #fragment)
   * when deciding whether to show the prompt.
   * Default is false.
   */
  ignoreHash?: boolean

  /**
   * Whether to ignore changes in the URL search params (i.e., ?query=...)
   * when deciding whether to show the prompt.
   * Default is false.
   */
  ignoreSearch?: boolean
}

/**
 * The return object from the usePrompt hook
 */
export interface UsePromptReturn {
  /**
   * Whether the custom prompt (usually a modal) should be shown to the user.
   */
  showPrompt: boolean

  /**
   * Call this function when the user confirms they want to proceed
   * with the navigation.
   */
  handleConfirm: () => void

  /**
   * Call this function when the user cancels the navigation
   * and wants to stay on the current page.
   */
  handleCancel: () => void
}

export function usePrompt({
  when,
  beforeUnload = true,
  ignoreHash = false,
  ignoreSearch = false,
}: UsePromptOptions): UsePromptReturn {
  const [showPrompt, setShowPrompt] = useState(false)

  const shouldIgnoreNavigation = (
    currentLocation: Location<any>,
    nextLocation: Location<any>
  ) => {
    if (ignoreHash && ignoreSearch) {
      return currentLocation.pathname === nextLocation.pathname
    }

    if (ignoreSearch) {
      return (
        currentLocation.pathname === nextLocation.pathname &&
        currentLocation.hash === nextLocation.hash
      )
    }

    if (ignoreHash) {
      return (
        currentLocation.pathname === nextLocation.pathname &&
        currentLocation.search === nextLocation.search
      )
    }

    return false
  }

  const blocker = useBlocker((tx) => {
    if (when) {
      const currentLocation = tx.currentLocation
      const nextLocation = tx.nextLocation

      if (shouldIgnoreNavigation(currentLocation, nextLocation)) {
        return false
      }

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
