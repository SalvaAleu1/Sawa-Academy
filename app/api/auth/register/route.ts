import { NextResponse } from "next/server";
import { z } from "zod";
import { createSession, hashPassword } from "@/lib/auth";
import { ensureDb, findUserByEmail, sql } from "@/lib/db";

const schema=z.object({name:z.string().min(2).max(80),email:z.string().email(),password:z.string().min(8).max(128)});

export async function POST(req:Request){
  try{
    const b=schema.parse(await req.json());
    await ensureDb();
    if(await findUserByEmail(b.email)) return NextResponse.json({error:"An account already exists with this email."},{status:409});
    const id=crypto.randomUUID();
    await sql!`INSERT INTO users (id,name,email,password_hash,role) VALUES (${id},${b.name.trim()},${b.email.toLowerCase()},${await hashPassword(b.password)},'student')`;
    await createSession(id);
    return NextResponse.json({ok:true});
  }catch(e:any){
    return NextResponse.json({error:e?.issues?.[0]?.message||e.message||"Unable to create account."},{status:400});
  }
}