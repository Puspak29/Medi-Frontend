import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa"

function Footer() {
    const year=new Date().getFullYear();

  return (
    <>
    <footer className="bg-cyan-700 text-white py-8 text-center">
        <h3 className="text-xl font-semibold mb-2">Stay Connected with MedHistory</h3>
        <p className="text-cyan-100 mb-4">Your trusted digital health companion.</p>
        <p className="text-cyan-100 mb-4">Made By <Link to="https://github.com/Puspak29" className="mr-2">
            <FaGithub className="inline ml-2" /> Puspak29
            </Link></p>
        <p className="text-sm text-cyan-200">© {year} MedHistory. All rights reserved.</p>
      </footer>
    </>
  )
}

export default Footer
