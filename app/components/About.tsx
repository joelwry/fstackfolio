"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { AnimatedGradient } from "./ui/animated-gradient"

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          <AnimatedGradient className="inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-white px-4 py-2">About Me</h2>
          </AnimatedGradient>
        </motion.div>
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            "Hello, you can call me joelwry, a dedicated software engineer and technology enthusiast with a deep love for turning complex challenges into elegant digital solutions.", 
            "Over the years, I’ve honed my skills across various domains—from web development and API integration to blockchain development and AI-powered systems. My journey in tech began with a curiosity for how things work and evolved into a relentless pursuit of creating products that are not only functional but also beautifully engineered.",
            "My expertise spans across a wide range of programming languages including JavaScript, Python, TypeScript, Java, Marlowe, Solidity, and Vyper, and I’ve had the pleasure of working with modern frameworks such as Django, Next.js, Express.js, Node.js, React, and React Native. Whether it’s developing a full-stack application, building a secure smart contract, or crafting a real-time API, I take pride in writing maintainable, efficient code that adheres to best practices.",
            "I thrive in collaborative environments and am an active advocate for open source, believing that shared knowledge and community-driven development pave the way for innovation. My portfolio showcases a collection of projects ranging from AI-based trading bots and automated social media integrations to decentralized applications and innovative utility libraries. Each project reflects my commitment to quality, user-centric design, and continuous learning.",
            "Outside of coding, I enjoy exploring emerging tech trends, mentoring aspiring developers,  music production, and sharing my insights through blog posts and community forums. I’m always excited to connect with fellow innovators and discuss how technology can make a positive impact in our world.",
            "Welcome to my digital space—take a look around and explore the projects that define my journey in the world of technology.",
          ].map((paragraph, index) => (
            <motion.p
              key={index}
              className="text-gray-300 mb-6"
              whileHover={{ scale: 1.05, color: "#60A5FA" }}
              transition={{ duration: 0.2 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About

