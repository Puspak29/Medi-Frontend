import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa"

function Footer() {
    const year=new Date().getFullYear();

  return (
    <>
    <footer className="no-print bg-gray-800 text-white py-10 text-center border-t-4 border-cyan-600">
          <div className="max-w-6xl mx-auto px-4">
              <h3 className="text-2xl font-bold text-cyan-200 mb-3">MedHistory</h3>
              <p className="text-gray-300 mb-6 max-w-lg mx-auto">Your trusted digital platform for secure and accessible health record management.</p>

              <div className="flex justify-center items-center flex-wrap gap-4 mb-6">
                  <p className="text-gray-400 text-base flex items-center">
                      Made By 
                      <Link to="https://github.com/Puspak29" className="text-cyan-400 hover:text-cyan-300 font-semibold ml-2 flex items-center transition-colors">
                          <FaGithub className="inline-block w-5 h-5 mr-1" /> Puspak29
                      </Link>
                  </p>
              </div>
              
              <p className="text-sm text-gray-500 pt-4 border-t border-gray-700">© {year} MedHistory. All rights reserved.</p>
          </div>
      </footer>
    </>
  )
}

export default Footer
