"use client"

import { useParams, notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { blogContent as blogPosts } from "@/data/articles"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism"

export default function BlogPostPage() {
  const { id } = useParams()
  const post = blogPosts.find((p) => p.id === id)

  if (!post) {
    notFound()
  }

  // Simple markdown-like rendering for the content
  const renderContent = (content: string) => {
    const paragraphs = content.split("\n\n")
    return paragraphs.map((paragraph, index) => {

        // Check if it's a code block
    //const codeBlockMatch = paragraph.match(/^```(\w+)?\n([\s\S]+?)\n```$/)
    const codeBlockMatch = paragraph.match(/```(\w+)?\n([\s\S]+?)```/);
    console.log('\n\n\nWAS CODEBLOCK MATCHED ?')
    console.log(codeBlockMatch);
    console.log('\n\n\n')
    if (codeBlockMatch) {
     
      const language = codeBlockMatch[1] || "plaintext" // Default to plaintext if no language is specified
      const codeContent = codeBlockMatch[2]

      return (
        <SyntaxHighlighter key={index} language={language} style={dracula} className="rounded-lg overflow-auto my-4">
          {codeContent}
        </SyntaxHighlighter>
      )
    }

      if (paragraph.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-semibold text-white mt-8 mb-4">
            {paragraph.substring(3)}
          </h2>
        )
      } else if (paragraph.startsWith("- ")) {
        return (
          <ul key={index} className="list-disc pl-5 my-4 text-gray-300">
            {paragraph.split("\n").map((item, i) => (
              <li key={i} className="mb-2">
                {item.substring(2)}
              </li>
            ))}
          </ul>
        )
      } else if (paragraph.includes("1. **")) {
        return (
          <ol key={index} className="list-decimal pl-5 my-4 text-gray-300">
            {paragraph.split("\n").map((item, i) => {
              const match = item.match(/\d+\.\s+\*\*(.+?)\*\*:?\s+(.+)/)
              if (match) {
                return (
                  <li key={i} className="mb-2">
                    <strong>{match[1]}</strong>: {match[2]}
                  </li>
                )
              } else {
                return (
                  <li key={i} className="mb-2">
                    {item}
                  </li>
                )
              }
            })}
          </ol>
        )
      } else {
        return (
          <p key={index} className="mb-4 text-gray-300">
            {paragraph}
          </p>
        )
      }
    })
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-20">
      <div className="container mx-auto px-6">
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-400">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
              {post.tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center px-2 py-1 bg-blue-900/30 text-blue-300 rounded-full text-xs"
                >
                  <Tag size={10} className="mr-1" />
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full h-[300px] md:h-[400px] mb-8 rounded-xl overflow-hidden">
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>

          <div className="prose prose-lg prose-invert max-w-none">{renderContent(post.content)}</div>
        </motion.div>
      </div>
    </div>
  )
}

