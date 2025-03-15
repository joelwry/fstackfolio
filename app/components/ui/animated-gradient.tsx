"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type React from "react"

export const AnimatedGradient = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <motion.div
      className={cn("relative overflow-hidden rounded-lg", className)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 opacity-100"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 100%",
        }}
      />
      <div className="relative bg-[#0A0A0A] z-10 m-[2px] rounded-lg">{children}</div>
    </motion.div>
  )
}

