// Project Types
export interface Technology {
  name: string
  icon?: string
}

export interface TechCategory {
  id: string
  name: string
  technologies: Technology[]
}

export interface Project {
  id: string
  title: string
  slug: string
  summary: string
  description: string
  fullDescription?: string[]
  image: string
  github?: string
  liveUrl?: string | null
  technologies: string[]
  features?: string[]
  challenges?: string[]
  createdAt: Date
  updatedAt: Date
  otherImages : string[]
}

// Blog Types
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  date: string
  readTime: string
  tags: string[]
  status: "published" | "draft"
  createdAt: Date
  updatedAt: Date
}

export interface Tag {
  id: string
  name: string
  slug: string
}

// Admin Types
export interface User {
  id: string
  name: string
  email: string
  password: string // This would be hashed in a real application
  role: "admin" | "editor"
  createdAt: Date
  updatedAt: Date
}

// Form Types
export interface ProjectFormData {
  title: string
  slug: string
  summary: string
  description: string
  fullDescription: string
  image: string | File
  github: string
  liveUrl: string
  technologies: string[]
  features: string[]
  challenges: string[]
}

export interface BlogPostFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string | File
  date: string
  readTime: string
  tags: string[]
  status: "published" | "draft"
}

export interface TechFormData {
  name: string
  icon: string | File
  categoryId: string
}

export interface CategoryFormData {
  name: string
}

