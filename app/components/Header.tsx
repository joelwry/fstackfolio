"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  
  let pathname = usePathname();
  const [isHomePage, setIsHomePage] = useState(pathname === '/');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(()=>{
    setIsHomePage(pathname === "/")
  },[pathname])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
  }

 
  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0A0A0A] dark:bg-[#0A0A0A] shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white dark:text-white">
          Sulaimon Joel
        </Link>
        <div className="flex items-center space-x-6">
          <ul className="hidden md:flex space-x-6">
            {["about", "tech-stack", "projects", "contact"].map((item : string) => (
              <li key={item}>
                {
                  isHomePage ?
                    <button
                      onClick={() => scrollToSection(item)}
                      className="text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors"
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                      :
                      <Link
                      href={"/#"+item}
                      className="text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors"
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Link>
                }
              </li>
            ))}
            <li>
              <Link
                href="/blog"
                className="text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors"
              >
                Blog
              </Link>
            </li>
          </ul>

         
          {/* Mobile menu button - would be expanded in a real implementation */}
          <button className="md:hidden text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </motion.header>
  )
}

export default Header

