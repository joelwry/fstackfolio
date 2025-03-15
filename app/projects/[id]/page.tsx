"use client"

import { useParams, notFound } from "next/navigation"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import projects from "@/data/projects"

export default function ProjectDetailPage() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  // State for additional images carousel
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Handler functions for carousel
  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.otherImages.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === project.otherImages.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-20">
      <div className="container mx-auto px-6">
        <Link
          href="/#projects"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {project.title}
            </h1>

            {/* Main project image */}
            <div className="relative w-full h-[300px] md:h-[400px] mb-8 rounded-xl overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>

            <div className="space-y-6 text-gray-300">
              {project.fullDescription.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Key Features
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
              
            {/* Additional images carousel */}
            {project.otherImages && project.otherImages.length > 0 && (
              <div className="relative w-full h-[200px] md:h-[300px] mb-8 rounded-xl overflow-hidden">
                <Image
                  src={project.otherImages[currentImageIndex]}
                  alt={`${project.title} - screenshot ${currentImageIndex + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
                <button
                  onClick={handlePrev}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full"
                >
                  Prev
                </button>
                <button
                  onClick={handleNext}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full"
                >
                  Next
                </button>
              </div>
            )}

            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Challenges & Solutions
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                {project.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-[#1A1A1A] rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-white mb-4">
                Project Details
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-[#252525] text-gray-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">
                    Links
                  </h3>
                  <div className="space-y-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View Source Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Live Demo
                      </a>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#333333]">
                  <Link
                    href="/#contact"
                    className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center transition-colors"
                  >
                    Contact Me About This Project
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

