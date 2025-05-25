import { prisma } from '../../.../../../../lib/prisma.js'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const { email, otp } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || user.otp !== otp || new Date(user.otpExpiry) < new Date()) {
    return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 })
  }

  return NextResponse.json({ message: 'OTP verified' }, { status: 200 })
}
export async function GET(req) {
  const { email, otp } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || user.otp !== otp || new Date(user.otpExpiry) < new Date()) {
    return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 })
  }

  return NextResponse.json({ message: 'OTP verified' }, { status: 200 })
}       