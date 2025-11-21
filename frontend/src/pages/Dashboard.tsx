import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { chatApi } from '../lib/api'
import { Button } from '../components/Button'
import { Activity, Send, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
    setMessage('')
    setIsLoading(true)

    try {
      const res = await chatApi.sendMessage(message)
      const aiMsg = { role: 'assistant', content: res.data.response }
      setMessages((prev) => [...prev, aiMsg])
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
    toast.success('Logged out')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">AI Doctor</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.subscriptionTier} Plan</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat */}
      <main className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Messages Area */}
          <div className="h-[calc(100vh-240px)] overflow-y-auto p-6 space-y-6">
            {messages.length === 0 ? (
              <div className="text-center py-20">
                <Activity className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Welcome to AI Doctor
                </h3>
                <p className="text-gray-500 mb-6">
                  Ask me any health-related question to get started
                </p>
                <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
                  <button
                    onClick={() => setMessage('What are the symptoms of the flu?')}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
                  >
                    💊 Flu symptoms
                  </button>
                  <button
                    onClick={() => setMessage('How can I improve my sleep quality?')}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
                  >
                    😴 Better sleep
                  </button>
                  <button
                    onClick={() => setMessage('What foods are good for heart health?')}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
                  >
                    ❤️ Heart health
                  </button>
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <div key={idx} className="flex gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                        msg.role === 'user' ? 'bg-primary-600' : 'bg-gray-700'
                      }`}>
                        {msg.role === 'user' ? user?.username[0].toUpperCase() : 'AI'}
                      </div>
                    </div>

                    {/* Message Content */}
                    <div className="flex-1 space-y-2">
                      <div className="font-semibold text-sm text-gray-900">
                        {msg.role === 'user' ? user?.username : 'AI Doctor'}
                      </div>
                      <div className={`prose prose-sm max-w-none ${
                        msg.role === 'assistant' ? 'prose-blue' : ''
                      }`}>
                        {msg.role === 'assistant' ? (
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.content}
                          </ReactMarkdown>
                        ) : (
                          <p className="text-gray-700">{msg.content}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-semibold">
                        AI
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-gray-900 mb-2">AI Doctor</div>
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 bg-gray-50 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Type your health question here..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSend} 
                disabled={isLoading || !message.trim()}
                className="px-6"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              ⚠️ Educational purposes only. Always consult healthcare professionals for medical advice.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
