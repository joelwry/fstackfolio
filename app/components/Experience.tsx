"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { AnimatedGradient } from "./ui/animated-gradient"

const experiences = [
  {
    title: "Data Analyst Intern",
    company: "Omalco Extrusions",
    location: "New Delhi, India",
    period: "June 2020 – July 2022",
    description: [
      "Addressed inefficiencies in production due to lack of real-time visibility and manual aluminum profile identification.",
      "Designed and implemented real-time Power BI dashboards to streamline data-driven decision-making processes.",
      "Increased operational efficiency by 10% through enhanced data access and visibility.",
      "Engineered a TensorFlow CNN model to automate aluminum profile identification, achieving 95% accuracy.",
      "Optimized production workflows, boosting manufacturing efficiency by 30% through automation.",
      "Delivered detailed market analysis reports to non-technical shareholders, translating technical insights.",
    ],
    tools: "Power BI, Tableau, Streamlit, R-Studio, R, Python, SQL, MongoDB, Azure, TensorFlow, GitHub",
  },
  {
    title: "Proprietary Trader",
    company: "Jain Capital",
    location: "Jaipur, India",
    period: "May 2020 – May 2022",
    description: [
      "Executed high-frequency intraday trades in equities, options, and commodities by integrating multi-factor fundamental analysis and technical indicators.",
      "Designed and implemented options trading strategies, enhancing portfolio performance with 30% ROI over 1 Month.",
      "Developed and managed a diversified portfolio, incorporating tactical asset allocation to align with short-term price movements.",
      "Provided data-driven insights and actionable recommendations, contributing to the firm's overall trading strategy and enhancing profitability metrics by 21%.",
    ],
    tools: "Python, R, Excel, Statistical Analysis, Financial Modeling, Technical Analysis",
  },
]

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="experience" className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          <AnimatedGradient className="inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-white px-4 py-2">Work Experience</h2>
          </AnimatedGradient>
        </motion.div>
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              className="mb-8 bg-[#111111] rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.h3
                className="text-xl font-semibold text-blue-400 mb-4"
                whileHover={{ color: "#60A5FA" }}
                transition={{ duration: 0.3 }}
              >
                {exp.title}
              </motion.h3>
              <motion.p className="text-gray-300 mb-1" whileHover={{ color: "#9CA3AF" }} transition={{ duration: 0.3 }}>
                {exp.company}
              </motion.p>
              <motion.p
                className="text-sm text-gray-400 mb-4"
                whileHover={{ color: "#D1D5DB" }}
                transition={{ duration: 0.3 }}
              >
                {exp.location} | {exp.period}
              </motion.p>
              <ul className="list-disc pl-5 text-gray-300 mb-4">
                {exp.description.map((item, i) => (
                  <motion.li
                    key={i}
                    className="mb-2"
                    whileHover={{ color: "#60A5FA", x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
              <motion.p
                className="text-sm text-gray-400"
                whileHover={{ color: "#9CA3AF" }}
                transition={{ duration: 0.3 }}
              >
                Tools: {exp.tools}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience

