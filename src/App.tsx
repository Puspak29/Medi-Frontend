import { Link } from "react-router-dom"
import routes from "./routes"

function App() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center space-y-6">
      <h2 className="text-3xl font-bold">Welcome to MedHistory 👋</h2>
      <p className="text-xl font-mono">Your one way solution for managing medical history and efficient doctor-patient connection.</p>
      <Link 
      to={routes.auth.user.login}
      className="text-l text-blue-900 underline"
      >
        Get Started ⟫
      </Link>
    </div>
  )
}

export default App
