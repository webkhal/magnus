'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (res?.error) {
      setError('Invalid email or password')
    } else {
      router.push('/home')
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <h1>Login to Magnus</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '0.5rem' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '0.5rem' }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button
          type="submit"
          style={{ padding: '0.75rem', backgroundColor: '#0070f3', color: 'white', border: 'none' }}
        >
          Login
        </button>

        <p style={{ textAlign: 'right', marginTop: '0.5rem' }}>
          <a
            href="/forgot-password"
            style={{ color: '#0070f3', textDecoration: 'underline', fontSize: '0.9rem' }}
          >
            Forgot Password?
          </a>
        </p>
      </form>
    </div>
  )
}
