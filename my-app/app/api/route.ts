import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export const GET = function Get(req: Request) {
    return NextResponse.json({ message: "Api services are online.", apiVer: "v1.1-R2.2", api: "/api" })
}