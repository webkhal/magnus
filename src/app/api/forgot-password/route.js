import { prisma } from '../../../../lib/prisma.js'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req) {
  try {
    const { email } = await req.json()

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ error: 'Email not found' }, { status: 404 })
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000)

    await prisma.user.update({
      where: { email },
      data: { otp, otpExpiry },
    })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Magnus - Reset Password OTP',
      html: `<p>Your OTP for resetting password is: <b>${otp}</b>. It is valid for 10 minutes.</p>`,
    })

    return NextResponse.json({ message: 'OTP sent to email' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
