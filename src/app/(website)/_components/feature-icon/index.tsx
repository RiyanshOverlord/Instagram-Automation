"use client";

import { motion, useInView } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  lottieUrl?: string;
  Icon?: any;
  label?: string;
};

const FeatureIcon = ({ lottieUrl, Icon, label }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });
  const lottieRef = useRef<any>(null);
  const [animationData, setAnimationData] = useState<any | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (!lottieUrl) return;
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(lottieUrl);
        const json = await res.json();
        if (mounted) setAnimationData(json);
      } catch (e) {
        console.warn("Failed to load Lottie icon", e);
      }
    })();

    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mq.matches);
      const handler = (ev: MediaQueryListEvent) => setReducedMotion(ev.matches);
      if (mq.addEventListener) mq.addEventListener("change", handler);
      else mq.addEventListener("change", handler);

      return () => {
        mounted = false;
        if (mq.removeEventListener) mq.removeEventListener("change", handler);
        else mq.removeListener(handler);
      };
    }

    return () => {
      mounted = false;
    };
  }, [lottieUrl]);

  useEffect(() => {
    if (!animationData || reducedMotion) return;
    if (inView) {
      lottieRef.current?.play?.();
    } else {
      lottieRef.current?.pause?.();
    }
  }, [inView, animationData, reducedMotion]);

  return (
    <div ref={ref} className="flex items-center">
      <motion.div
        initial={{ opacity: 0, y: 6, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        whileHover={{ scale: 1.06 }}
        className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400"
        aria-hidden
      >
        {animationData ? (
          <div className="h-10 w-10">
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              loop
              autoplay={false}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        ) : Icon ? (
          <Icon className="h-6 w-6" />
        ) : (
          <div className="h-6 w-6 rounded-full bg-blue-400/10" />
        )}
      </motion.div>
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
};

export default FeatureIcon;
