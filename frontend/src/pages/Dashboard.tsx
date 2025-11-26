import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { chatApi } from '../lib/api'
import { Button } from '../components/Button'
import { 
  Activity, Send, LogOut, Menu, MessageSquare, 
  User, Settings, History, Sparkles 
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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const handleSend = async () => {
    if (!message.trim()) return

    const userMsg = { role: 'user', content: message }
    setMessages((prev) => [...prev, userMsg])
    setMessage('')
    setIsLoading(true)

    try {
      const res = await chatApi.sendMessage(message)
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

  const suggestedQuestions = [
    { icon: '💊', text: 'What are the symptoms of the flu?' },
    { icon: '😴', text: 'How can I improve my sleep quality?' },
    { icon: '❤️', text: 'What foods are good for heart health?' },
    { icon: '🧘', text: 'Tips for reducing stress and anxiety?' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Doctor
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user?.username[0].toUpperCase()}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                  <p className="text-xs text-gray-500">Free Plan</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed lg:relative inset-y-0 left-0 z-20 w-64 bg-white border-r border-gray-200 lg:translate-x-0 pt-20 lg:pt-0"
            >
              <div className="p-4 space-y-2">
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <MessageSquare className="h-5 w-5" />
                  <span className="font-medium">New Chat</span>
                </button>
                
                <div className="pt-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
                    Menu
                  </p>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
                    <History className="h-5 w-5" />
                    <span>History</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Chat */}
        <main className="flex-1 flex flex-col h-[calc(100vh-73px)]">
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="max-w-4xl mx-auto">
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Sparkles className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    Welcome to AI Doctor
                  </h2>
                  <p className="text-gray-600 mb-8 text-lg">
                    Ask me any health-related question to get started
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                    {suggestedQuestions.map((q, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMessage(q.text)}
                        className="flex items-start space-x-3 p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-md transition-all text-left group"
                      >
                        <span className="text-2xl">{q.icon}</span>
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">
                          {q.text}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          msg.role === 'user' 
                            ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                            : 'bg-gradient-to-br from-gray-700 to-gray-900'
                        }`}>
                          <span className="text-white text-sm font-semibold">
                            {msg.role === 'user' ? user?.username[0].toUpperCase() : 'AI'}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="font-semibold text-sm text-gray-700">
                          {msg.role === 'user' ? user?.username : 'AI Doctor'}
                        </div>
                        <div className={`rounded-2xl px-6 py-4 ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                            : 'bg-white border-2 border-gray-200 shadow-sm'
                        }`}>
                          {msg.role === 'assistant' ? (
                            <div className="prose prose-sm max-w-none">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {msg.content}
                              </ReactMarkdown>
                            </div>
                          ) : (
                            <p className="text-white">{msg.content}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">AI</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-gray-700 mb-2">AI Doctor</div>
                        <div className="bg-white border-2 border-gray-200 rounded-2xl px-6 py-4">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 bg-white/80 backdrop-blur-sm px-4 py-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                    placeholder="Ask me anything about health..."
                    className="w-full px-6 py-4 pr-12 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-gray-900 placeholder-gray-500"
                    disabled={isLoading}
                  />
                </div>
                <Button 
                  onClick={handleSend} 
                  disabled={isLoading || !message.trim()}
                  className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                ⚠️ Educational purposes only. Always consult healthcare professionals.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
