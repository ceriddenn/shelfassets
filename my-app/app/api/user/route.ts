import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import { prisma } from '@/lib/prisma'
export const GET = auth(async function GET(req) {
    if (req.auth) {
        const query = await prisma.user.findUnique({
            where: {
                id: req.auth.user.id
            },
        })

        if (query) return NextResponse.json(query);
        return NextResponse.json({
            message: "No user found with the correlated ID. Contact a system admin.",
            error: true,
            data: undefined
        })
    }
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
})

export async function POST(req: Request) {

    const body = await req.json();
    console.log(body)

    const query = await prisma.user.findFirst({
        where: {
            id: body.id
        },
        include: {
            workspaces: true
        }
    })
    // basically means user is signing up
    if (!query) return NextResponse.json({ message: "Error" });
    if (query.workspaces.length === 0) {
        await prisma.workspace.create({
            data: {
                workspaceType: "PERSONAL",
                image: "",
                name: `${body.name}'s Workspace`,
                accountHolder: {
                    connect: {
                        id: body.id,
                    }
                },
            }
        })
    }

    return NextResponse.json({ message: "Success" })
}