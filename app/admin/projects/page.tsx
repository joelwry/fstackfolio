"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { PlusCircle, Save, Trash2, Upload, X, Edit, Eye } from "lucide-react"
import Image from "next/image"
import type { ProjectFormData, Project } from "@/types"
import Link from "next/link"

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    slug: "",
    summary: "",
    description: "",
    fullDescription: "",
    image: "",
    github: "",
    liveUrl: "",
    technologies: [],
    features: [],
    challenges: [],
  })
  const [newTech, setNewTech] = useState("")
  const [newFeature, setNewFeature] = useState("")
  const [newChallenge, setNewChallenge] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null)


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddTechnology = () => {
    if (newTech.trim()) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()],
      }))
      setNewTech("")
    }
  }

  const handleRemoveTechnology = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }))
  }

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...(prev.features || []), newFeature.trim()],
      }))
      setNewFeature("")
    }
  }

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: (prev.features || []).filter((_, i) => i !== index),
    }))
  }

  const handleAddChallenge = () => {
    if (newChallenge.trim()) {
      setFormData((prev) => ({
        ...prev,
        challenges: [...(prev.challenges || []), newChallenge.trim()],
      }))
      setNewChallenge("")
    }
  }

  const handleRemoveChallenge = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      challenges: (prev.challenges || []).filter((_, i) => i !== index),
    }))
  }

  const handleEditProject = (project: Project) => {
    setFormData({
      title: project.title,
      slug: project.slug,
      summary: project.summary,
      description: project.description,
      fullDescription: project.fullDescription?.join("\n\n") || "",
      image: project.image,
      github: project.github || "",
      liveUrl: project.liveUrl || "",
      technologies: project.technologies,
      features: project.features || [],
      challenges: project.challenges || [],
    })
    setEditMode(true)
    setCurrentProjectId(project.id)
  }

  const handleCreateNew = () => {
    setFormData({
      title: "",
      slug: "",
      summary: "",
      description: "",
      fullDescription: "",
      image: "",
      github: "",
      liveUrl: "",
      technologies: [],
      features: [],
      challenges: [],
    })
    setEditMode(false)
    setCurrentProjectId(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would send data to your API
    console.log("Submitting project:", formData)

    // Mock implementation for demo
    if (editMode && currentProjectId) {
      // Update existing project
      setProjects((prev) =>
        prev.map((p) =>
          p.id === currentProjectId
            ? {
                ...p,
                title: formData.title,
                slug: formData.slug,
                summary: formData.summary,
                description: formData.description,
                fullDescription: formData.fullDescription.split("\n\n"),
                image: typeof formData.image === "string" ? formData.image : URL.createObjectURL(formData.image),
                github: formData.github,
                liveUrl: formData.liveUrl,
                technologies: formData.technologies,
                features: formData.features,
                challenges: formData.challenges,
                updatedAt: new Date(),
              }
            : p,
        ),
      )
    } else {
      // Create new project
      const newProject: Project = {
        id: Date.now().toString(),
        title: formData.title,
        slug: formData.slug,
        summary: formData.summary,
        description: formData.description,
        fullDescription: formData.fullDescription.split("\n\n"),
        image: typeof formData.image === "string" ? formData.image : URL.createObjectURL(formData.image),
        github: formData.github,
        liveUrl: formData.liveUrl,
        technologies: formData.technologies,
        features: formData.features,
        challenges: formData.challenges,
        createdAt: new Date(),
        updatedAt: new Date(),
        otherImages : []
      }

      setProjects((prev) => [...prev, newProject])
    }

    // Reset form
    handleCreateNew()
  }

  const handleDeleteProject = (id: string) => {
    // In a real app, this would call your API
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Projects</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleCreateNew}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-[#333333]">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">
                {editMode ? "Edit Project" : "Add New Project"}
              </CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                Fill in the details to {editMode ? "update" : "create"} a project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-700 dark:text-white">
                      Project Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="bg-gray-50 dark:bg-[#252525] border-gray-300 dark:border-[#333333] text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug" className="text-gray-700 dark:text-white">
                      Project Slug (URL)
                    </Label>
                    <Input
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      className="bg-gray-50 dark:bg-[#252525] border-gray-300 dark:border-[#333333] text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary" className="text-gray-700 dark:text-white">
                    Summary (short description)
                  </Label>
                  <Textarea
                    id="summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    className="bg-gray-50 dark:bg-[#252525] border-gray-300 dark:border-[#333333] text-gray-900 dark:text-white"
                    rows={2}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-700 dark:text-white">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="bg-gray-50 dark:bg-[#252525] border-gray-300 dark:border-[#333333] text-gray-900 dark:text-white"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullDescription" className="text-gray-700 dark:text-white">
                    Full Description (separate paragraphs with blank lines)
                  </Label>
                  <Textarea
                    id="fullDescription"
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleInputChange}
                    className="bg-gray-50 dark:bg-[#252525] border-gray-300 dark:border-[#333333] text-gray-900 dark:text-white"
                    rows={5}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github" className="text-gray-700 dark:text-white">
                      GitHub URL
                    </Label>
                    <Input
                      id="github"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      className="bg-gray-50 dark:bg-[#252525] border-gray-300 dark:border-[#333333] text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="liveUrl" className="text-gray-700 dark:text-white">
                      Live Demo URL (optional)
                    </Label>
                    <Input
                      id="liveUrl"
                      name="liveUrl"
                      value={formData.liveUrl}
                      onChange={handleInputChange}
                      className="bg-gray-50 dark:bg-[#252525] border-gray-300 dark:border-[#333333] text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 dark:text-white">Technologies Used</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      placeholder="Add a technology"
                      className="bg-gray-50 dark:bg-[#252525] border-gray-300 dark:border-[#333333] text-gray-900 dark:text-white"
                    />
                    <Button
                      type="button"
                      onClick={handleAddTechnology}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 p-3 bg-gray-50 dark:bg-[#252525] rounded-md">
                    {formData.technologies.map((tech, index) => (
                      <div
                        key={index}
                        className="flex items-center px-3 py-1 bg-gray-200 dark:bg-[#333333] text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        <span>{tech}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTechnology(index)}
                          className="ml-1 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {formData.technologies.length === 0 && (
                      <p className="text-gray-500 dark:text-gray-400 text-sm">No technologies added yet</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 dark:text-white">Features</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add a feature"
                      className="bg-gray-50 dark:bg-[#252525] border-gray-300 dark:border-[#333333] text-gray-900 dark:text-white"
                    />
                    <Button
                      type="button"
                      onClick={handleAddFeature}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="space-y-2 p-3 bg-gray-50 dark:bg-[#252525] rounded-md">
                    {formData.features?.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-100 dark:bg-[#333333] rounded-md"
                      >
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    {!formData.features?.length && (
                      <p className="text-gray-500 dark:text-gray-400 text-sm">No features added yet</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 dark:text-white">Challenges</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      value={newChallenge}
                      onChange={(e) => setNewChallenge(e.target.value)}
                      placeholder="Add a challenge"
                      className="bg-gray-50 dark:bg-[#252525] border-gray-300 dark:border-[#333333] text-gray-900 dark:text-white"
                    />
                    <Button
                      type="button"
                      onClick={handleAddChallenge}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="space-y-2 p-3 bg-gray-50 dark:bg-[#252525] rounded-md">
                    {formData.challenges?.map((challenge, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-100 dark:bg-[#333333] rounded-md"
                      >
                        <span className="text-gray-700 dark:text-gray-300">{challenge}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveChallenge(index)}
                          className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    {!formData.challenges?.length && (
                      <p className="text-gray-500 dark:text-gray-400 text-sm">No challenges added yet</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 dark:text-white">Project Image</Label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-[#333333] rounded-md p-4 text-center">
                    <div className="flex items-center justify-center">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Drag and drop an image, or click to browse
                    </p>
                    <Input
                      type="text"
                      name="image"
                      value={typeof formData.image === "string" ? formData.image : ""}
                      onChange={handleInputChange}
                      placeholder="Or enter an image URL"
                      className="bg-gray-50 dark:bg-[#252525] border-gray-300 dark:border-[#333333] text-gray-900 dark:text-white mb-2"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="bg-gray-50 dark:bg-[#252525] text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-[#333333] border-gray-300 dark:border-[#444444]"
                    >
                      Upload Image
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-gray-300 dark:border-[#333333] text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-[#333333]"
                    onClick={handleCreateNew}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    {editMode ? "Update Project" : "Save Project"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-[#333333]">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Existing Projects</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                {projects.length} projects found
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-100 dark:bg-[#252525] rounded-lg p-4 animate-pulse">
                      <div className="h-4 bg-gray-200 dark:bg-[#333333] rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-[#333333] rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-[#333333] rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-gray-50 dark:bg-[#252525] rounded-lg overflow-hidden shadow-sm">
                      <div className="relative h-32">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1">{project.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{project.summary}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-gray-200 dark:bg-[#333333] text-gray-700 dark:text-gray-300 rounded-full text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-0.5 bg-gray-200 dark:bg-[#333333] text-gray-700 dark:text-gray-300 rounded-full text-xs">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
                              onClick={() => handleEditProject(project)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Link href={`/projects/${project.slug}`} target="_blank">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                              onClick={() => handleDeleteProject(project.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {projects.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400 mb-4">No projects found</p>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleCreateNew}>
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add Your First Project
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

