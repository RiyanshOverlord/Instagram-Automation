"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Is Auto-Mate a real SaaS product?",
    answer:
      "Auto-Mate is a demo project built for educational and portfolio purposes. It showcases how AI-powered Instagram automation could work in a real-world application.",
  },
  {
    question: "Do I need to connect my Instagram account?",
    answer:
      "For the demo version, Instagram connection is simulated. In a production system, this would be handled securely using official Meta APIs.",
  },
  {
    question: "Is this project using real AI?",
    answer:
      "Yes. The project demonstrates AI-based workflows conceptually. Responses and analytics are designed to reflect how real AI systems behave.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Security is a priority in the design. The system follows best practices such as role-based access, secure authentication, and protected routes.",
  },
  {
    question: "Can this be extended into a real product?",
    answer:
      "Absolutely. The architecture is scalable and modular, making it suitable for future expansion into a full SaaS platform.",
  },
]

const FAQHomepage = () => {
  return (
    <section className="relative bg-slate-950 py-20 md:py-28">
      <div className="container px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-blue-200">
            Everything you need to know about Auto-Mate and how it works.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-12 max-w-3xl"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border border-white/10 bg-slate-900/60 px-4 backdrop-blur"
              >
                <AccordionTrigger className="text-left text-white hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-blue-200">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQHomepage