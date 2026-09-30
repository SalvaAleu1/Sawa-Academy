import { NextResponse } from "next/server"; import { requireUser } from "@/lib/auth"; import { getUserEnrollments } from "@/lib/db";
export async function GET(){try{const u=await requireUser();return NextResponse.json({courses:await getUserEnrollments(u.id)});}catch{return NextResponse.json({error:'Sign in required.'},{status:401})}}
