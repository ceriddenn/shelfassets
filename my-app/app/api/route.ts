import { NextResponse } from "next/server"

export const GET = function Get() {
    return NextResponse.json({ message: "Api services are online.", apiVer: "v1.1-R2.2", api: "/api" })
}