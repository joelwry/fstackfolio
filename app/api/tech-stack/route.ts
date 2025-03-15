import { NextResponse } from "next/server"

// This would connect to your database in a real application
// For now, we'll use a mock implementation

export async function GET() {
  // Mock data - in a real app, this would come from a database
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
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
        },
        { name: "Shadcn UI", icon: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4" },
        {
          name: "Materialize CSS",
          icon: "https://raw.githubusercontent.com/prplx/svg-logos/master/svg/materialize.svg",
        },
      ],
    },
    // Other categories would be here
  ]

  return NextResponse.json(techCategories)
}

export async function POST(request: Request) {
  try {
    const tech = await request.json()

    // In a real app, you would validate and save to a database
    // For now, we'll just return the tech with a mock ID

    return NextResponse.json(
      {
        ...tech,
        id: `tech-${Date.now()}`,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to create technology" }, { status: 500 })
  }
}

