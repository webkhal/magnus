  import { prisma } from '../../../../lib/prisma.js'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { email, newPassword } = await req.json()
    const hashed = await hash(newPassword, 10)

    await prisma.user.update({
      where: { email },
      data: {
        password: hashed,
        otp: null,
        otpExpiry: null,
      },
    })

    return NextResponse.json({ message: 'Password reset successful' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Password reset failed' }, { status: 500 })
  }
}

// Optionally, remove GET if not needed, or return a method not allowed:
export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
}