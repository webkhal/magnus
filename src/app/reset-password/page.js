'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const searchParams = useSearchParams()

  const email = searchParams.get('email')
  const otp = searchParams.get('otp')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword: password }),
    })
    const data = await res.json()
    setMessage(data.message || data.error)
  }

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}
