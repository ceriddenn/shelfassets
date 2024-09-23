import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import { prisma } from '@/lib/prisma'
export const GET = auth(async function GET(req) {
    if (req.auth) {
        const query = await prisma.workspace.findMany({
            where: {
                OR: [
                    {
                        workspaceAdmins: {
                            has: req.auth.user.id
                        },
                    },
                    {
                        workspaceMembers: {
                            has: req.auth.user.id
                        }
                    },
                    {
                        accountHolder: {
                            id: req.auth.user.id
                        }
                    }
                ]
            },

        })
        if (query) return NextResponse.json(query);
        return NextResponse.json({
            message: "No workspaces found on server.",
            error: true
        })
    }
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
})