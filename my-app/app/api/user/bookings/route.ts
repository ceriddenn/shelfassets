import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import { prisma } from '@/lib/prisma'
import { error } from "console"

export const GET = auth(async function GET(req) {
    if (req.auth) {
        const query = await prisma.user.findUnique({
            where: {
                id: req.auth.user.id,
            },
            select: {
                bookings: true
            }
        })

        if (query) return NextResponse.json(query);
        return NextResponse.json({
            message: "No bookings field is present on the user model. An account reset is recommended.",
            error: true
        })
    }
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
})