"use client"

import { motion } from "framer-motion"
import Lottie from "lottie-react"
import { useEffect, useState } from "react"

// Replace this URL with any Lottie JSON URL or a local JSON import.
const ANIMATION_URL = "https://assets7.lottiefiles.com/packages/lf20_9wpyhdzo.json"

const HeroLottie = () => {
  const [animationData, setAnimationData] = useState<any | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch(ANIMATION_URL)
        const json = await res.json()
        if (mounted) setAnimationData(json)
      } catch (e) {
        console.warn("Failed to load Lottie animation", e)
      }
    })()

    // Respect prefers-reduced-motion
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
      setReducedMotion(mq.matches)
      const handler = (ev: MediaQueryListEvent) => setReducedMotion(ev.matches)
      if (mq.addEventListener) mq.addEventListener("change", handler)
      else mq.addListener(handler)

      return () => {
        mounted = false
        if (mq.removeEventListener) mq.removeEventListener("change", handler)
        else mq.removeListener(handler)
      }
    }

    return () => {
      mounted = false
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex items-center justify-center"
    >
      <motion.div
        whileHover={reducedMotion ? undefined : { scale: 1.02 }}
        className="pointer-events-auto max-w-[420px] sm:max-w-[480px]"
      >
        {animationData ? (
          <Lottie
            animationData={animationData}
            loop={!reducedMotion}
            autoplay={!reducedMotion}
            style={{ width: "100%", height: "auto" }}
          />
        ) : (
          <div className="flex h-72 w-full items-center justify-center rounded-xl bg-slate-800/40">
            <svg
              className="h-16 w-16 animate-spin text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default HeroLottie
