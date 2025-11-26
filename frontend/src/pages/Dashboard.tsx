import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { chatApi } from '../lib/api'
import { Button } from '../components/Button'
import { 
  Activity, Send, LogOut, Sparkles, Trash2
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { motion, AnimatePresence } from 'framer-motion'

export function Dashboard() {
  const { user, logout } = useAuthStore()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSend = async () => {
    if (!message.trim()) return

    const userMsg = { role: 'user', content: message }
    setMessages((prev) => [...prev, userMsg])
    const currentMessage = message
    setMessage('')
    setIsLoading(true)

    try {
      const res = await chatApi.sendMessage(currentMessage)
      const aiMsg = { role: 'assistant', content: res.data.response }
      setMessages((prev) => [...prev, aiMsg])
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to send message')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
    toast.success('Logged out successfully')
  }

  const clearChat = () => {
    setMessages([])
    toast.success('Chat cleared')
  }

  const suggestedQuestions = [
    { icon: '💊', text: 'What are the symptoms of the flu?', gradient: 'from-blue-500 to-cyan-500' },
    { icon: '😴', text: 'How can I improve my sleep quality?', gradient: 'from-purple-500 to-pink-500' },
    { icon: '❤️', text: 'What foods are good for heart health?', gradient: 'from-red-500 to-orange-500' },
    { icon: '🧘', text: 'Tips for reducing stress and anxiety?', gradient: 'from-green-500 to-emerald-500' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">AI Doctor</span>
            </motion.div>

            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {messages.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearChat}
                  className="text-white hover:bg-white/10"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
              <div className="hidden sm:flex items-center space-x-3 px-4 py-2 glass rounded-full">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user?.username[0].toUpperCase()}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">{user?.username}</p>
                  <p className="text-xs text-gray-300">Free Plan</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-white hover:bg-red-500/20"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content - Centrado */}
      <main className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Messages Area */}
          <div className="min-h-[calc(100vh-280px)] mb-6">
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <motion.div 
                  className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-purple-500/50"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="h-12 w-12 text-white" />
                </motion.div>
                <h2 className="text-4xl font-bold text-white mb-4">
                  Welcome to AI Doctor
                </h2>
                <p className="text-gray-300 mb-12 text-lg max-w-2xl mx-auto">
                  Your personal AI health assistant is ready to help. Ask any health-related question to get started.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {suggestedQuestions.map((q, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setMessage(q.text)}
                      className="group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" 
                           style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
                      <div className="relative flex items-start space-x-4 p-6 glass rounded-2xl hover:shadow-2xl transition-all text-left">
                        <div className={`w-12 h-12 bg-gradient-to-br ${q.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                          <span className="text-2xl">{q.icon}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium group-hover:text-blue-200 transition-colors">
                            {q.text}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="space-y-8">
                <AnimatePresence>
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4"
                    >
                      {/* Avatar */}
                      <motion.div 
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                          msg.role === 'user' 
                            ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-blue-500/50' 
                            : 'bg-gradient-to-br from-gray-700 to-gray-900 shadow-gray-900/50'
                        }`}>
                          <span className="text-white text-sm font-bold">
                            {msg.role === 'user' ? user?.username[0].toUpperCase() : 'AI'}
                          </span>
                        </div>
                      </motion.div>

                      {/* Message Content */}
                      <div className="flex-1 space-y-2">
                        <div className="font-semibold text-sm text-white">
                          {msg.role === 'user' ? user?.username : 'AI Doctor'}
                        </div>
                        <motion.div 
                          className={`rounded-2xl px-6 py-4 shadow-xl ${
                            msg.role === 'user'
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-purple-500/30'
                              : 'glass text-gray-100 shadow-black/20'
                          }`}
                          whileHover={{ scale: 1.01 }}
                        >
                          {msg.role === 'assistant' ? (
                            <div className="prose prose-sm prose-invert max-w-none">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {msg.content}
                              </ReactMarkdown>
                            </div>
                          ) : (
                            <p className="text-white leading-relaxed">{msg.content}</p>
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Loading Indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">AI</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-white mb-2">AI Doctor</div>
                      <div className="glass rounded-2xl px-6 py-4 shadow-xl">
                        <div className="flex space-x-2">
                          <motion.div 
                            className="w-3 h-3 bg-blue-500 rounded-full"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                          />
                          <motion.div 
                            className="w-3 h-3 bg-purple-500 rounded-full"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                          />
                          <motion.div 
                            className="w-3 h-3 bg-pink-500 rounded-full"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Input Area - Fixed at Bottom */}
          <div className="glass rounded-2xl p-4 shadow-2xl shadow-black/20">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Ask me anything about health..."
                  className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
                  disabled={isLoading}
                />
              </div>
              <Button 
                onClick={handleSend} 
                disabled={isLoading || !message.trim()}
                className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">
              ⚠️ Educational purposes only. Always consult healthcare professionals.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
