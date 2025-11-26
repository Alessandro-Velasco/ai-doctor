// ~/ai-doctor/frontend/src/pages/Landing.tsx

import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import {
  Activity,
  Shield,
  Zap,
  Sparkles,
  Clock,
  Lock,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { motion } from 'framer-motion'

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/10">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AI Doctor</span>
            </motion.div>

            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="pt-20 pb-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your AI-Powered <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Health Assistant
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
                Get instant, reliable medical information powered by cutting-edge AI technology.
                Available 24/7 for all your health questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Watch Demo
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 shadow-2xl shadow-purple-500/20">
                <div className="w-full h-64 bg-white/10 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-12 w-12 text-white" />
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center space-x-3 text-sm text-gray-300">
                    <Clock className="h-4 w-4" />
                    <span>24/7 Availability</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-300">
                    <Shield className="h-4 w-4" />
                    <span>Secure & Private</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-300">
                    <Zap className="h-4 w-4" />
                    <span>Instant Answers</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center text-white mb-12"
          >
            Why Choose AI Doctor?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8 text-blue-400" />,
                title: "Instant Answers",
                desc: "Get immediate responses to your health questions powered by state-of-the-art AI models.",
              },
              {
                icon: <Lock className="h-8 w-8 text-purple-400" />,
                title: "Private & Secure",
                desc: "Your health information is encrypted and private. We never share your personal data.",
              },
              {
                icon: <CheckCircle2 className="h-8 w-8 text-green-400" />,
                title: "Reliable Information",
                desc: "Our AI provides evidence-based, educational content curated from trusted medical sources.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 rounded-xl text-white"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="py-8 bg-black/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto glass p-6 rounded-xl text-white">
            <h3 className="text-lg font-semibold mb-2">Medical Disclaimer</h3>
            <p className="text-gray-300">
              AI Doctor provides educational information only. Always consult qualified healthcare professionals for medical advice, diagnosis, or treatment.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>© 2025 AI Doctor. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Made with ❤️ by Alessandro — Fullstack Developer & AI Engineer
          </p>
        </div>
      </footer>
    </div>
  )
}
