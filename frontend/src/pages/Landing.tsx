import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { Activity, Shield, Zap, Users, ChevronRight, Sparkles, Clock, Lock, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
              <span className="text-2xl font-bold text-white">AI Doctor</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-white text-sm">Powered by Advanced AI</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Your AI-Powered
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Health Assistant
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Get instant, reliable medical information powered by cutting-edge AI technology.
              Available 24/7 for all your health questions.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 text-lg shadow-lg shadow-purple-500/50"
                >
                  Start Free Trial
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm"
                >
                  Watch Demo
                </Button>
              </Link>
            </div>

            <div className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl max-w-3xl mx-auto backdrop-blur-sm">
              <div className="flex items-start space-x-3">
                <Shield className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="text-sm text-yellow-100 font-medium mb-1">Medical Disclaimer</p>
                  <p className="text-sm text-yellow-200/80">
                    AI Doctor provides educational information only. Always consult qualified healthcare 
                    professionals for medical advice, diagnosis, or treatment.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose AI Doctor?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Experience the future of healthcare information with our advanced AI platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Instant Answers',
                description: 'Get immediate responses to your health questions powered by state-of-the-art AI models.',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                icon: Lock,
                title: 'Private & Secure',
                description: 'Your health information is encrypted and private. We never share your personal data.',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: Clock,
                title: '24/7 Available',
                description: 'Access health information anytime, anywhere. No appointments needed, no waiting times.',
                color: 'from-blue-500 to-purple-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300">
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-300 text-lg">
              Choose the plan that's right for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
              <p className="text-gray-400 mb-6">Perfect for trying out</p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-white">$0</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['10 questions/month', 'Basic AI responses', 'Email support'].map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="block">
                <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                  Get Started
                </Button>
              </Link>
            </motion.div>

            {/* Pro - Featured */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative p-8 bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border-2 border-blue-500/50 rounded-2xl transform scale-105"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <p className="text-gray-300 mb-6">For regular users</p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-white">$9</span>
                <span className="text-gray-300">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  'Unlimited questions',
                  'Advanced AI responses',
                  'Priority support',
                  'Conversation history',
                  'Export conversations'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-200">
                    <CheckCircle2 className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="block">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Start Free Trial
                </Button>
              </Link>
            </motion.div>

            {/* Enterprise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
              <p className="text-gray-400 mb-6">For organizations</p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-white">Custom</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  'Everything in Pro',
                  'API access',
                  'Custom integrations',
                  'Dedicated support',
                  'SLA guarantee'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-white/20 rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Health Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust AI Doctor for reliable health information
            </p>
            <Link to="/register">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 text-lg shadow-lg shadow-purple-500/50"
              >
                Start Your Free Trial Today
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-white">AI Doctor</span>
            </div>
            <p className="text-sm text-gray-400">
              © 2025 AI Doctor. Educational purposes only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
