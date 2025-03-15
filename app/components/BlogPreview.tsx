"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { AnimatedGradient } from "./ui/animated-gradient"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { blogContent as blogPosts } from "@/data/articles"


const BlogPreview = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="blog" className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          <AnimatedGradient className="inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-white px-4 py-2">Blog</h2>
          </AnimatedGradient>
          <p className="text-gray-400">Thoughts, insights, and tutorials on data analytics and machine learning</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => {
            if(index < 3){
              return(
                <motion.div
                  key={post.id}
                  className="bg-[#1A1A1A] rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-blue-500/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.coverImage || "/placeholder.svg"}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="ghost" className="w-full text-blue-400 hover:text-blue-300 hover:bg-blue-900/20">
                        <span className="mr-1">Read Article</span>
                        <ArrowRight size={16} />
                      </Button>
                    </Link>
                  </div>
                </motion.div>  
              )
            }
          })}
        </div>

        <div className="mt-10 text-center">
          <Link href="/blog">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">View All Articles</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BlogPreview

