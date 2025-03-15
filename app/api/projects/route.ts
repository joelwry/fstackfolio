import { NextResponse } from "next/server"

// This would connect to your database in a real application
// For now, we'll use a mock implementation

export async function GET() {
  // Mock data - in a real app, this would come from a database
  const projects = [
    {
      id: "portfolio-optimization",
      title: "Portfolio Optimization using Machine Learning",
      summary:
        "Advanced portfolio optimization system using Agglomerative Clustering to identify stocks with similar risk and return metrics.",
      description:
        "Developed an advanced portfolio optimization system leveraging machine learning techniques, specifically Agglomerative Clustering. The project identifies stocks with similar risk and return metrics, clustering them to create diversified and efficient portfolios. This approach enhances traditional portfolio theory by incorporating data-driven insights and reducing dimensionality in large-scale investment decisions.",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      github: "https://github.com/ArnavJ19/PortfolioML",
      liveUrl: null,
      technologies: ["Python", "scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    },
    // Other projects would be here
  ]

  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  try {
    const project = await request.json()

    // In a real app, you would validate and save to a database
    // For now, we'll just return the project with a mock ID

    return NextResponse.json(
      {
        ...project,
        id: project.id || `project-${Date.now()}`,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}

