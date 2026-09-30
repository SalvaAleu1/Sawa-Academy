import { NextResponse } from "next/server";
import { z } from "zod";
import { createSession, hashPassword } from "@/lib/auth";
import { ensureDb, findUserByEmail, sql } from "@/lib/db";

const schema=z.object({
  email:z.string().email(),
  name:z.string().min(2).max(80),
  password:z.string().min(10).max(128),
  setupToken:z.string().min(16)
});

export async function POST(req:Request){
  try{
    const b=schema.parse(await req.json());
    const configuredEmail=process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const configuredToken=process.env.ADMIN_SETUP_TOKEN;
    if(!configuredEmail||!configuredToken) return NextResponse.json({error:"Administrator setup is not enabled."},{status:503});
    if(b.email.toLowerCase()!==configuredEmail||b.setupToken!==configuredToken) return NextResponse.json({error:"Administrator credentials are not valid."},{status:403});

    await ensureDb();
    const admins=await sql!`SELECT id,email FROM users WHERE role='admin' LIMIT 1`;
    if(admins[0]) return NextResponse.json({error:"An administrator has already been configured."},{status:409});

    let user=await findUserByEmail(configuredEmail);
    let id:string;
    if(user){
      id=user.id;
      await sql!`UPDATE users SET name=${b.name.trim()},password_hash=${await hashPassword(b.password)},role='admin' WHERE id=${id}`;
    }else{
      id=crypto.randomUUID();
      await sql!`INSERT INTO users (id,name,email,password_hash,role) VALUES (${id},${b.name.trim()},${configuredEmail},${await hashPassword(b.password)},'admin')`;
    }
    await createSession(id);
    return NextResponse.json({ok:true});
  }catch(e:any){
    return NextResponse.json({error:e?.issues?.[0]?.message||e.message||"Administrator setup failed."},{status:400});
  }
}