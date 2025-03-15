import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold">
              Sulaimon Joel
            </Link>
          </div>
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com/in/arnavj19" className="hover:text-blue-400 transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com/joelwry" className="hover:text-blue-400 transition-colors">
              GitHub
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Sulaimon Joel. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer

