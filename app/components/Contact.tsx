"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Linkedin, MessageCircleCode, FileText, Github} from "lucide-react"
import { AnimatedGradient } from "./ui/animated-gradient"
import Link from "next/link"

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const contactInfo = [
    {icon:Github, text:"Github", href:"https://www.github.com/joelwry"},
    { icon: Linkedin, text: "LinkedIn", href: "https://www.linkedin.com/in/joelwry" },
    { icon: MessageCircleCode, text: "whatsapp", href:`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=I%20was%20just%20going%20through%20your%20portfolio%20.%20i%20want%20to` },
  ]

  return (
    <section id="contact" className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          <AnimatedGradient className="inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-white px-4 py-2">Social Connect</h2>
          </AnimatedGradient>
        </motion.div>
        <div className="max-w-2xl mx-auto">
          {contactInfo.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              className="flex items-center justify-center mb-6 p-4 bg-[#1E1E1E] rounded-lg hover:bg-[#252525] transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
            >
              <item.icon className="w-6 h-6 mr-4 text-blue-400" />
              <span className="text-white text-lg">{item.text}</span>
            </motion.a>
          ))}
          <Link href="/resume" className="w-full">
            <motion.div
              className="flex items-center justify-center p-4 bg-[#1E1E1E] rounded-lg hover:bg-[#252525] transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-6 h-6 mr-4 text-blue-400" />
              <span className="text-white text-lg">View Resume</span>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Contact

