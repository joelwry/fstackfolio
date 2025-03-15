"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { AnimatedGradient } from "./ui/animated-gradient"

const techCategories = [
  {
    name: "Frontend Development",
    technologies: [
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      {
        name: "Bootstrap",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
      },
      {
        name: "Tailwind CSS",
        icon: "https://www.cdnlogo.com/logos/t/34/tailwind-css.svg",
      },
      { name: "Shadcn UI", icon: "https://miro.medium.com/v2/resize:fit:1024/1*xFASqi7HgNXyCvQJ9NmEDA.png" },
      { name: "Materialize CSS", icon: "https://extensions.typo3.org/fileadmin/ter/t/3/t3themes_materializecss_1.4.1.png" },
    ],
  },
  {
    name: "Backend Development",
    technologies: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    ],
  },
  {
    name: "Mobile Development",
    technologies: [
      { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Flet", icon: "https://flet.dev/img/logo.svg" },
    ],
  },
  {
    name: "Database Management",
    technologies: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    ],
  },
  {
    name: "Desktop Development",
    technologies: [
      { name: "JavaFX", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "SceneBuilder", icon: "https://external-preview.redd.it/A_9_LvC32qhfZMfpyISVp4wzgeWjt6oiGJptjmQjVhI.jpg?auto=webp&s=a2aa1233b9af77788b8543f7cc8da1dedb2c4652" },
    ],
  },
]

const TechStack = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
      },
    },
  }

  return (
    <section id="tech-stack" className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          <AnimatedGradient className="inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-white px-4 py-2">Tech Stack</h2>
          </AnimatedGradient>
          <p className="text-gray-400">Technologies I work with across different domains</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {techCategories.map((category) => (
            <motion.div key={category.name} variants={itemVariants} className="mb-10">
              <h3 className="text-2xl font-semibold text-blue-400 mb-6">{category.name}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
                {category.technologies.map((tech) => (
                  <motion.div
                    key={tech.name}
                    className="flex flex-col items-center justify-center p-4 bg-[#1A1A1A] rounded-lg hover:bg-[#252525] transition-colors"
                    whileHover={{ scale: 1.05, backgroundColor: "#252525" }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div className="w-12 h-12 mb-3 relative" variants={iconVariants} whileHover="hover">
                      <Image
                        src={tech.icon || "/placeholder.svg?height=48&width=48"}
                        alt={tech.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain filter brightness-100 hover:brightness-110 transition-all"
                      />
                    </motion.div>
                    <span className="text-sm text-gray-300 text-center">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TechStack

