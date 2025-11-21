import { useState } from 'react'
import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:8000' })

function App() {
  const [token, setToken] = useState('')
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const register = async () => {
    try {
      await api.post('/api/v1/auth/register', {
        username,
        email: username + '@test.com',
        password
      })
      alert('Registered! Now login.')
    } catch (e: any) {
      alert(e.response?.data?.detail || 'Error')
    }
  }

  const login = async () => {
    try {
      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)
      
      const res = await api.post('/api/v1/auth/login', formData)
      setToken(res.data.access_token)
      alert('Logged in!')
    } catch (e: any) {
      alert(e.response?.data?.detail || 'Error')
    }
  }

  const chat = async () => {
    try {
      const res = await api.post(
        '/api/v1/chat',
        { message },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setResponse(res.data.response)
    } catch (e: any) {
      alert(e.response?.data?.detail || 'Error')
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', maxWidth: 800, margin: '0 auto' }}>
      <h1>🏥 AI Doctor</h1>
      
      {!token ? (
        <div style={{ marginBottom: 20, padding: 20, background: '#f5f5f5', borderRadius: 8 }}>
          <h2>Login / Register</h2>
          <div style={{ marginBottom: 10 }}>
            <input 
              placeholder="Username" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{ margin: 5, padding: 10, width: 200, fontSize: 14 }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <input 
              type="password"
              placeholder="Password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ margin: 5, padding: 10, width: 200, fontSize: 14 }}
            />
          </div>
          <button onClick={register} style={{ margin: 5, padding: 10, fontSize: 14, background: '#4CAF50', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Register</button>
          <button onClick={login} style={{ margin: 5, padding: 10, fontSize: 14, background: '#2196F3', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Login</button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: 10, padding: 10, background: '#e7f3e7', borderRadius: 4 }}>
            ✅ Logged in as: <strong>{username}</strong>
          </div>
          
          <h2>Chat with AI Doctor</h2>
          <textarea 
            placeholder="Ask a medical question... (e.g., What are the symptoms of the flu?)"
            value={message}
            onChange={e => setMessage(e.target.value)}
            style={{ width: '100%', height: 120, padding: 12, marginBottom: 10, fontSize: 14, borderRadius: 4, border: '1px solid #ccc' }}
          />
          <br/>
          <button onClick={chat} style={{ padding: 12, fontSize: 14, background: '#2196F3', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Send Message</button>
          
          {response && (
            <div style={{ marginTop: 20, padding: 20, background: '#f0f8ff', borderRadius: 8, border: '1px solid #2196F3' }}>
              <h3>AI Response:</h3>
              <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{response}</p>
              <div style={{ marginTop: 15, padding: 10, background: '#fff3cd', borderRadius: 4, fontSize: 12 }}>
                ⚠️ <strong>MEDICAL DISCLAIMER:</strong> This information is for educational purposes only. Always consult healthcare professionals for medical advice.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
