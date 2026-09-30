import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { ensureDb,sql } from "@/lib/db";
const schema=z.object({
  supportEmail:z.string().email().or(z.literal("")),
  certificateIssuer:z.string().min(2).max(80),
  defaultCurrency:z.enum(["USD","SSP"]),
  learningSupportNote:z.string().max(300)
});
export async function PUT(req:Request){
  try{
    await requireAdmin();const b=schema.parse(await req.json());await ensureDb();
    for(const [key,value] of Object.entries(b))await sql!`INSERT INTO academy_settings (key,value,updated_at) VALUES (${key},${String(value)},NOW()) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value,updated_at=NOW()`;
    return NextResponse.json({ok:true});
  }catch(e:any){return NextResponse.json({error:e?.issues?.[0]?.message||e.message||"Unable to save settings."},{status:400})}
}
