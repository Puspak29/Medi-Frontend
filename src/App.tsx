import HomePage from "./app/HomePage"

function App() {

  return (
    <div className="flex flex-col min-h-screen text-center space-y-6">
      {/* <h2 className="text-3xl font-bold">Welcome to MedHistory 👋</h2>
      <p className="text-xl font-mono">Your one way solution for managing medical history and efficient doctor-patient connection.</p>
      <Link 
      to={routes.auth.user.login}
      className="text-l text-blue-900 underline"
      >
        Get Started ⟫
      </Link> */}
      <HomePage />
    </div>
  )
}

export default App
