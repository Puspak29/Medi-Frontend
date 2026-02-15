import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa"
import { Activity } from "lucide-react";

function Footer() {
    const year=new Date().getFullYear();

  return (
    <>
    <footer className="no-print w-full bg-gray-800 text-white py-8 text-center border-t-4 border-cyan-600">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-6">
        
        {/* Brand */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 cursor-default">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <Activity className="text-white w-6 h-6" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">MedHistory</span>
          </div>
          <p className="text-slate-600 font-medium uppercase tracking-wider">© {year}</p>
        </div>

        {/* Tagline */}
        <div className="text-center">
          <p className="text-base text-slate-200 font-bold tracking-wide">Your Health, Simplified and Secure</p>
          <p className="text-sm text-slate-500 mt-1.5 max-w-[500px] lg:max-w-none leading-relaxed">
            Access, track, and manage medical reports and consultations for patients and providers.
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center space-x-5">
          <Link to="https://github.com/Puspak29" target="_blank" rel="noreferrer" className="flex items-center space-x-2">
            <span className="text-slate-600">Made by</span>
            <FaGithub className="inline-block w-5 h-5 mr-1" />
            <span className="font-semibold">Puspak29</span>
          </Link>
        </div>

      </div>
    </footer>
    </>
  )
}

export default Footer
