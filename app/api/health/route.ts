import { NextResponse } from "next/server";
export async function GET(){return NextResponse.json({ok:true,service:"Sawa Academy",time:new Date().toISOString()},{headers:{"cache-control":"no-store"}})}