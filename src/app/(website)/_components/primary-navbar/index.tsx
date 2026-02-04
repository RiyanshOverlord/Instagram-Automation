"use client"

import { Button } from "@/components/ui/button"
import { MenuIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"

const PrimaryNavbar = () => {
  const [open, setOpen] = useState(false)

    const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: "smooth" })
    setOpen(false) // closes mobile menu after click
  }

  return (
    <motion.header initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-900/70 border-b border-white/10">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white">
            AM
          </div>
          <div className="leading-tight">
            <div className="text-lg font-semibold text-white">
              Auto-Mate
            </div>
            <div className="text-xs text-blue-200">
              Automate Instagram growth
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-white md:flex">
          <motion.button
  onClick={() => scrollTo("features")}
  whileHover={{ y: -3 }}
  className="hover:text-blue-400 text-left"
>
  Features
      </motion.button>
          <motion.button
             onClick={() => scrollTo("pricing")}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="transition-colors hover:text-blue-400"
          >
            Pricing
          </motion.button>
          <motion.button
             onClick={() => scrollTo("faq")}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="transition-colors hover:text-blue-400"
          >
            FAQ
          </motion.button>

          <Button
            asChild
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Link href="/dashboard">Login</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-slate-900/95">
          <nav className="flex flex-col gap-4 px-6 py-4 text-sm text-white">
            <a href="#features" onClick={() => setOpen(false)}>
              Features
            </a>
            <a href="#pricing" onClick={() => setOpen(false)}>
              Pricing
            </a>
            <a href="#" onClick={() => setOpen(false)}>
              Blog
            </a>
            <Link href="/dashboard" onClick={() => setOpen(false)}>
              <Button className="mt-2 w-full bg-blue-600 hover:bg-blue-700">
                Login
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </motion.header>
  )
}

export default PrimaryNavbar