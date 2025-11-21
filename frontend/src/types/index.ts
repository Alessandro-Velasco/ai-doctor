export interface User {
  id: number
  username: string
  email: string
  fullName?: string
  subscriptionTier: string
  monthlyQueriesUsed: number
}

export interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}
