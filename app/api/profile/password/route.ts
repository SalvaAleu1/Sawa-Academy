import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUser,hashPassword,verifyPassword } from "@/lib/auth";
import { ensureDb,findUserByEmail,sql } from "@/lib/db";

const schema=z.object({currentPassword:z.string().min(1),newPassword:z.string().min(10).max(128)});

export async function PATCH(req:Request){
  try{
    const user=await currentUser();
    if(!user)return NextResponse.json({error:"Please sign in again."},{status:401});
    const body=schema.parse(await req.json());
    const stored=await findUserByEmail(user.email);
    if(!stored||!(await verifyPassword(body.currentPassword,stored.password_hash)))return NextResponse.json({error:"Current password is incorrect."},{status:400});
    if(await verifyPassword(body.newPassword,stored.password_hash))return NextResponse.json({error:"Choose a password different from your current password."},{status:400});
    await ensureDb();
    await sql!`UPDATE users SET password_hash=${await hashPassword(body.newPassword)} WHERE id=${user.id}`;
    return NextResponse.json({ok:true});
  }catch(e:any){
    return NextResponse.json({error:e?.issues?.[0]?.message||e.message||"Unable to change password."},{status:400});
  }
}
