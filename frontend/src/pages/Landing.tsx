import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { Activity } from 'lucide-react'

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold">AI Doctor</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Your AI-Powered <span className="text-primary-600">Health Assistant</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Get instant medical information powered by AI. Available 24/7.
        </p>
        <Link to="/register">
          <Button size="lg">Start Free Trial</Button>
        </Link>
      </section>
    </div>
  )
}
