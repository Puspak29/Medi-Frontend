import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa"

function Footer() {
    const year=new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-600">
            Made By <Link to="https://github.com/Puspak29" className="mr-2">
            <FaGithub className="inline ml-2" /> Puspak29.
            </Link>
          &copy; {year} MedHistory. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
