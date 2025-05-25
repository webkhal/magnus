'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import './styles/landing.css' // Adjust the path as necessary

export default function LandingPage() {
  const router = useRouter()
  const [typedText, setTypedText] = useState('')
  const fullText = 'Magnus'

  useEffect(() => {
    let index = 0
    let currentText = ''
    let timeoutId

    const type = () => {
      if (index < fullText.length) {
        currentText += fullText[index]
        setTypedText(currentText)
        index++
        timeoutId = setTimeout(type, 400)
      } else {
        timeoutId = setTimeout(() => {
          index = 0
          currentText = ''
          setTypedText('')
          timeoutId = setTimeout(type, 400)
        }, 6000)
      }
    }

    type()

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div className="landing-container">
      <div className="left-section">
        <h1 className="typing">{typedText}</h1>
      </div>
      <div className="right-section">
        <p className="quote">Join Magnus for free. Your privacy is our priority—no credentials stored, just pure creativity. ✨</p>
        <div className="buttons">
          <button onClick={() => router.push('/register')}>Register</button>
          <button onClick={() => router.push('/login')}>Login</button>
        </div>
      </div>
    </div>
  )
}