"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import PrimaryNavbar from "../primary-navbar"
import { motion } from "framer-motion"
import { Zap, BarChart2, Users } from "lucide-react"
import HeroLottie from "../hero-lottie"

const stats = [
  {
    icon: Zap,
    title: "Instant Replies",
    value: "< 1s",
    desc: "AI-powered responses",
  },
  {
    icon: Users,
    title: "Audience Growth",
    value: "+120%",
    desc: "Engagement increase",
  },
  {
    icon: BarChart2,
    title: "Smart Analytics",
    value: "24/7",
    desc: "Real-time insights",
  },
]

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-blue-900 to-slate-950">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-30" />
      </div>

      {/* Floating decorative blobs */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0.18 }}
        animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-20 -top-10 h-44 w-44 rounded-full bg-blue-600/20 blur-3xl"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0.12 }}
        animate={{ y: [0, 8, 0], x: [0, -6, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-20 top-20 h-36 w-36 rounded-full bg-indigo-600/15 blur-3xl"
      />

      <div className="relative">
        <div className="container px-4">
          <PrimaryNavbar />

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto mt-20 grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2"
          >
            <div className="text-center md:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-blue-300"
              >
                🚀 AI-powered Instagram automation
              </motion.div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                Automate engagement.
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Grow your audience faster.
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-200 md:mx-0">
                Auto-Mate helps creators and brands reply instantly, analyze
                engagement, and convert followers into loyal customers — powered
                by AI.
              </p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-10 flex flex-col items-center justify-start gap-4 sm:flex-row md:items-start"
              >
                <Link href="#pricing">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="lg"
                      className="bg-blue-600 px-8 text-white hover:bg-blue-700"
                    >
                      Get Started Free
                    </Button>
                  </motion.div>
                </Link>

                <Link href="#features">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/20 px-8 text-white hover:bg-white/10"
                    >
                      See Features
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Trust line */}
              <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-6 text-sm text-blue-300">
                <span>✔ No credit card required</span>
                <span>✔ Built for creators</span>
                <span>✔ Secure & private</span>
              </div>
            </div>

            {/* Lottie Illustration */}
            <div className="hidden items-center justify-center md:flex">
              <HeroLottie />
            </div>
          </motion.div>

          {/* Animated Stat Cards */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {stats.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ type: 'spring', stiffness: 280 }}
                className="rounded-xl border border-white/10 bg-slate-800/40 p-6 backdrop-blur"
              >
                <item.icon className="h-8 w-8 text-blue-400" />
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-3xl font-bold text-white">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-blue-300">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection