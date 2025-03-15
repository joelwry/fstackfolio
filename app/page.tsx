'use client'

import Hero from "./components/Hero"
import About from "./components/About"
import TechStack from "./components/TechStack"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import BlogPreview from "./components/BlogPreview"
import GithubShowcase from "./components/GithubShowcase"
import ContactForm from "./components/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <GithubShowcase />
      <BlogPreview />
      <ContactForm />
      <Contact />
    </>
  )
}

