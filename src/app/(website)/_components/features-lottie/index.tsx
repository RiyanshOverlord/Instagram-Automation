"use client"

import { motion, useInView } from "framer-motion"
import Lottie from "lottie-react"
import { useEffect, useRef, useState } from "react"

// Example Lottie for features - replace with your preferred animation
const FEATURES_ANIMATION_URL = "https://assets6.lottiefiles.com/packages/lf20_jcikwtux.json"

const FeaturesLottie = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const lottieRef = useRef<any>(null)
  const inView = useInView(ref, { once: false, margin: "-120px" })
  const [animationData, setAnimationData] = useState<any | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch(FEATURES_ANIMATION_URL)
        const json = await res.json()
        if (mounted) setAnimationData(json)
      } catch (e) {
        console.warn("Failed to load features Lottie", e)
      }
    })()

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

  // Control playback when in view
  useEffect(() => {
    if (!animationData || reducedMotion) return
    if (inView) {
      lottieRef.current?.play?.()
    } else {
      lottieRef.current?.pause?.()
    }
  }, [inView, animationData, reducedMotion])

  return (
    <div ref={ref} className="w-full max-w-[420px] p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {animationData ? (
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            loop
            autoplay={false}
            style={{ width: "100%", height: "auto" }}
          />
        ) : (
          <div className="flex h-56 w-full items-center justify-center rounded-xl bg-slate-900/50">
            <svg
              className="h-12 w-12 animate-spin text-blue-400"
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
    </div>
  )
}

export default FeaturesLottie
