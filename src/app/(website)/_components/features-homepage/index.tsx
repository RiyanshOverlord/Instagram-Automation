"use client"

import { motion } from "framer-motion"
import {
  Zap,
  BarChart2,
  Users,
  ShieldCheck,
  Star,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import FeaturesLottie from "../features-lottie"
import FeatureIcon from "../feature-icon"

const features = [
  {
    title: "AI-Powered Replies",
    description:
      "Context-aware AI replies that sound human and stay on-brand.",
    icon: Zap,
    // Lottie animation for AI / chat
    lottieUrl: "https://assets7.lottiefiles.com/packages/lf20_9wpyhdzo.json",
  },
  {
    title: "Analytics & Insights",
    description:
      "Track engagement, response times, and performance in real-time.",
    icon: BarChart2,
    // Lottie animation for charts/analytics
    lottieUrl: "https://assets6.lottiefiles.com/packages/lf20_jcikwtux.json",
  },
  {
    title: "Audience Growth",
    description:
      "Turn conversations into followers with automated workflows.",
    icon: Users,
    // Lottie animation for audience / growth
    lottieUrl: "https://assets2.lottiefiles.com/packages/lf20_vf0z4r9u.json",
  },
  {
    title: "Secure & Reliable",
    description:
      "Built with privacy-first architecture and scalable infrastructure.",
    icon: ShieldCheck,
    // Lottie animation for security / shield
    lottieUrl: "https://assets8.lottiefiles.com/packages/lf20_ydo1amjm.json",
  },
]

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  lottieUrl,
}: {
  title: string
  description: string
  icon: any
  lottieUrl?: string
}) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group rounded-xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <FeatureIcon lottieUrl={lottieUrl} Icon={Icon} label={title} />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-blue-300">
              {title}
            </h3>
            <p className="mt-2 text-sm text-blue-200">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const Features = () => {
  return (
    <section
      id="features"
      className="relative py-20 md:py-28 bg-slate-950"
    >
      <div className="container px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Powerful features built for creators
          </h2>
          <p className="mt-4 text-blue-200">
            Everything you need to manage, automate, and grow your Instagram
            presence — all in one place.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 items-start">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </motion.div>

          {/* Decorative Lottie illustration on larger screens */}
          <div className="hidden items-center justify-center md:flex">
            <FeaturesLottie />
          </div>
        </div>

        {/* Testimonial / Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <Card className="border-white/10 bg-slate-900/60 backdrop-blur">
            <CardContent className="flex items-start gap-4 p-6">
              <Star className="mt-1 h-6 w-6 text-yellow-400" />
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Loved by creators
                </h3>
                <p className="mt-1 text-sm text-blue-200">
                  “Auto-Mate helped me double my engagement in just a few
                  weeks. The AI replies feel natural and save hours every
                  day.”
                </p>
                <p className="mt-2 text-xs text-blue-400">
                  — Alex, Content Creator
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default Features