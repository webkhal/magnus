// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "../../../../../lib/prisma.js" // Adjust the path as necessary
import bcrypt from "bcrypt"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. Find user in DB
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        // 2. Check if user exists and password is correct
        if (!user) throw new Error("No user found")
        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) throw new Error("Invalid password")

        // 3. Return user object (without password)
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
