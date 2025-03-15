"use client"

import { Calendar } from "@/components/ui/calendar"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { PlusCircle, Save, Trash2, Upload, X } from "lucide-react"
import Image from "next/image"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("projects")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })

  // Mock login functionality - in a real app, this would connect to a backend
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple mock authentication
    if (loginData.email === "admin@example.com" && loginData.password === "password") {
      setIsAuthenticated(true)
    } else {
      alert("Invalid credentials")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center pt-20">
        <Card className="w-full max-w-md bg-[#1A1A1A] border-[#333333]">
          <CardHeader>
            <CardTitle className="text-white">Admin Login</CardTitle>
            <CardDescription className="text-gray-400">Login to manage your portfolio content</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  className="bg-[#252525] border-[#333333] text-white"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-[#252525] border-[#333333] text-white"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-20">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="projects" className="data-[state=active]:bg-blue-600">
              Projects
            </TabsTrigger>
            <TabsTrigger value="tech-stack" className="data-[state=active]:bg-blue-600">
              Tech Stack
            </TabsTrigger>
            <TabsTrigger value="blog" className="data-[state=active]:bg-blue-600">
              Blog
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">Manage Projects</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add New Project
              </Button>
            </div>

            <ProjectForm />

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">Existing Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProjectCard
                  title="Portfolio Optimization using Machine Learning"
                  image="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                />
                <ProjectCard
                  title="AI Trading Agent"
                  image="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tech-stack" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">Manage Tech Stack</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add New Technology
              </Button>
            </div>

            <TechStackForm />

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">Technology Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-[#1A1A1A] border-[#333333]">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-white">Frontend Development</CardTitle>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <PlusCircle className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <TechBadge name="React" />
                      <TechBadge name="Next.js" />
                      <TechBadge name="TypeScript" />
                      <TechBadge name="Tailwind CSS" />
                      <TechBadge name="HTML" />
                      <TechBadge name="CSS" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1A1A1A] border-[#333333]">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-white">Backend Development</CardTitle>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <PlusCircle className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <TechBadge name="Node.js" />
                      <TechBadge name="Express" />
                      <TechBadge name="Python" />
                      <TechBadge name="Django" />
                      <TechBadge name="Java" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">Manage Blog Posts</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="w-4 h-4 mr-2" />
                Create New Post
              </Button>
            </div>

            <BlogPostForm />

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">Published Posts</h3>
              <div className="space-y-4">
                <BlogPostRow
                  title="Machine Learning for Portfolio Optimization"
                  date="March 15, 2023"
                  status="Published"
                />
                <BlogPostRow
                  title="Reinforcement Learning in Algorithmic Trading"
                  date="April 22, 2023"
                  status="Published"
                />
                <BlogPostRow title="Advanced Data Visualization Techniques" date="May 10, 2023" status="Draft" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Project Form Component
function ProjectForm() {
  return (
    <Card className="bg-[#1A1A1A] border-[#333333]">
      <CardHeader>
        <CardTitle className="text-white">Add/Edit Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">
                Project Title
              </Label>
              <Input id="title" className="bg-[#252525] border-[#333333] text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="id" className="text-white">
                Project ID (URL slug)
              </Label>
              <Input id="id" className="bg-[#252525] border-[#333333] text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary" className="text-white">
              Summary (short description)
            </Label>
            <Textarea id="summary" className="bg-[#252525] border-[#333333] text-white" rows={2} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">
              Full Description
            </Label>
            <Textarea id="description" className="bg-[#252525] border-[#333333] text-white" rows={5} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="github" className="text-white">
                GitHub URL
              </Label>
              <Input id="github" className="bg-[#252525] border-[#333333] text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="liveUrl" className="text-white">
                Live Demo URL (optional)
              </Label>
              <Input id="liveUrl" className="bg-[#252525] border-[#333333] text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Technologies Used</Label>
            <div className="flex flex-wrap gap-2 p-3 bg-[#252525] rounded-md">
              <TechBadge name="Python" editable />
              <TechBadge name="TensorFlow" editable />
              <TechBadge name="Pandas" editable />
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs border-dashed border-[#555555] text-gray-400 hover:text-white"
              >
                + Add
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Project Image</Label>
            <div className="border-2 border-dashed border-[#333333] rounded-md p-4 text-center">
              <div className="flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
              </div>
              <p className="text-sm text-gray-400 mb-2">Drag and drop an image, or click to browse</p>
              <Button variant="outline" size="sm" className="bg-[#252525] text-white hover:bg-[#333333]">
                Upload Image
              </Button>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" className="border-[#333333] text-white hover:bg-[#333333]">
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Project
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

// Tech Stack Form Component
function TechStackForm() {
  return (
    <Card className="bg-[#1A1A1A] border-[#333333]">
      <CardHeader>
        <CardTitle className="text-white">Add/Edit Technology</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="techName" className="text-white">
                Technology Name
              </Label>
              <Input id="techName" className="bg-[#252525] border-[#333333] text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-white">
                Category
              </Label>
              <select
                id="category"
                className="w-full h-10 px-3 rounded-md bg-[#252525] border border-[#333333] text-white"
              >
                <option value="frontend">Frontend Development</option>
                <option value="backend">Backend Development</option>
                <option value="mobile">Mobile Development</option>
                <option value="database">Database Management</option>
                <option value="desktop">Desktop Development</option>
                <option value="new">+ Add New Category</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Technology Icon</Label>
            <div className="border-2 border-dashed border-[#333333] rounded-md p-4 text-center">
              <div className="flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
              </div>
              <p className="text-sm text-gray-400 mb-2">Upload an icon (SVG preferred)</p>
              <Button variant="outline" size="sm" className="bg-[#252525] text-white hover:bg-[#333333]">
                Upload Icon
              </Button>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" className="border-[#333333] text-white hover:bg-[#333333]">
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Technology
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

// Blog Post Form Component
function BlogPostForm() {
  return (
    <Card className="bg-[#1A1A1A] border-[#333333]">
      <CardHeader>
        <CardTitle className="text-white">Create/Edit Blog Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="postTitle" className="text-white">
                Post Title
              </Label>
              <Input id="postTitle" className="bg-[#252525] border-[#333333] text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postId" className="text-white">
                Post ID (URL slug)
              </Label>
              <Input id="postId" className="bg-[#252525] border-[#333333] text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt" className="text-white">
              Excerpt (short summary)
            </Label>
            <Textarea id="excerpt" className="bg-[#252525] border-[#333333] text-white" rows={2} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-white">
              Post Content
            </Label>
            <Textarea id="content" className="bg-[#252525] border-[#333333] text-white" rows={10} />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Tags</Label>
            <div className="flex flex-wrap gap-2 p-3 bg-[#252525] rounded-md">
              <TechBadge name="Machine Learning" editable />
              <TechBadge name="Finance" editable />
              <TechBadge name="Data Science" editable />
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs border-dashed border-[#555555] text-gray-400 hover:text-white"
              >
                + Add
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="publishDate" className="text-white">
                Publish Date
              </Label>
              <Input id="publishDate" type="date" className="bg-[#252525] border-[#333333] text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="readTime" className="text-white">
                Read Time
              </Label>
              <Input id="readTime" placeholder="e.g. 8 min read" className="bg-[#252525] border-[#333333] text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Cover Image</Label>
            <div className="border-2 border-dashed border-[#333333] rounded-md p-4 text-center">
              <div className="flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
              </div>
              <p className="text-sm text-gray-400 mb-2">Upload a cover image for your blog post</p>
              <Button variant="outline" size="sm" className="bg-[#252525] text-white hover:bg-[#333333]">
                Upload Image
              </Button>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" className="border-[#333333] text-white hover:bg-[#333333]">
              Save as Draft
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Publish Post
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

// Project Card Component
function ProjectCard({ title, image }: { title: string; image: string }) {
  return (
    <Card className="bg-[#1A1A1A] border-[#333333] overflow-hidden">
      <div className="relative h-32">
        <Image src={image || "/placeholder.svg"} alt={title} layout="fill" objectFit="cover" />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-white line-clamp-1">{title}</h4>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Tech Badge Component
function TechBadge({ name, editable = false }: { name: string; editable?: boolean }) {
  return (
    <div className="flex items-center px-3 py-1 bg-[#252525] text-gray-300 rounded-full text-sm">
      <span>{name}</span>
      {editable && (
        <button className="ml-1 text-gray-400 hover:text-white">
          <X size={14} />
        </button>
      )}
    </div>
  )
}

// Blog Post Row Component
function BlogPostRow({ title, date, status }: { title: string; date: string; status: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg">
      <div>
        <h4 className="font-medium text-white">{title}</h4>
        <div className="flex items-center text-sm text-gray-400 mt-1">
          <Calendar size={14} className="mr-1" />
          <span>{date}</span>
          <span
            className={`ml-3 px-2 py-0.5 rounded-full text-xs ${
              status === "Published" ? "bg-green-900/30 text-green-400" : "bg-yellow-900/30 text-yellow-400"
            }`}
          >
            {status}
          </span>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="border-[#333333] text-white hover:bg-[#333333]">
          Edit
        </Button>
        <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

