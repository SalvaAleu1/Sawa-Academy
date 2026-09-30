import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUser, hashPassword, verifyPassword } from "@/lib/auth";
import { ensureDb, findUserByEmail, sql } from "@/lib/db";

const schema=z.object({
  name:z.string().min(2).max(80),
  currentPassword:z.string().optional().default(""),
  newPassword:z.string().optional().default("")
});

export async function PATCH(req:Request){
  try{
    const user=await currentUser();
    if(!user)return NextResponse.json({error:"Please sign in again."},{status:401});
    const body=schema.parse(await req.json());
    await ensureDb();
    if(body.newPassword){
      if(body.newPassword.length<8)return NextResponse.json({error:"New password must be at least 8 characters."},{status:400});
      const stored=await findUserByEmail(user.email);
      if(!stored||!body.currentPassword||!(await verifyPassword(body.currentPassword,stored.password_hash))){
        return NextResponse.json({error:"Current password is incorrect."},{status:400});
      }
      await sql!`UPDATE users SET name=${body.name.trim()},password_hash=${await hashPassword(body.newPassword)} WHERE id=${user.id}`;
    }else{
      await sql!`UPDATE users SET name=${body.name.trim()} WHERE id=${user.id}`;
    }
    return NextResponse.json({ok:true});
  }catch(e:any){
    return NextResponse.json({error:e?.issues?.[0]?.message||e.message||"Unable to update profile."},{status:400});
  }
}
