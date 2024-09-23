import { prisma } from './prisma'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"
import authConfig from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
})