import { cookies } from "next/headers";
import { ensureDb, getUser, sql } from "./db";
import type { User } from "./types";

const COOKIE = "sawa_session";
const enc = new TextEncoder();
const hex = (a:ArrayBuffer) => [...new Uint8Array(a)].map(b=>b.toString(16).padStart(2,"0")).join("");

async function sha256(v:string){ return hex(await crypto.subtle.digest("SHA-256",enc.encode(v))); }
export async function hashPassword(password:string, salt=crypto.randomUUID()) {
  const key=await crypto.subtle.importKey("raw",enc.encode(password),"PBKDF2",false,["deriveBits"]);
  const bits=await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt:enc.encode(salt),iterations:160000},key,256);
  return `${salt}:${hex(bits)}`;
}
export async function verifyPassword(password:string, stored:string){ const [salt=""]=stored.split(":"); if(!salt) return false; return stored === await hashPassword(password,salt); }

export async function createSession(userId:string){
  await ensureDb(); const token=crypto.randomUUID()+crypto.randomUUID(); const tokenHash=await sha256(token); const id=crypto.randomUUID();
  const expires=new Date(Date.now()+1000*60*60*24*30);
  await sql!`INSERT INTO sessions (id,user_id,token_hash,expires_at) VALUES (${id},${userId},${tokenHash},${expires.toISOString()})`;
  const jar=await cookies(); jar.set(COOKIE,token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",expires});
}
export async function destroySession(){ const jar=await cookies(); const token=jar.get(COOKIE)?.value; if(token&&sql){await ensureDb(); await sql`DELETE FROM sessions WHERE token_hash=${await sha256(token)}`;} jar.delete(COOKIE); }
export async function currentUser():Promise<User|null>{
  if(!sql) return null; const jar=await cookies(); const token=jar.get(COOKIE)?.value; if(!token) return null; await ensureDb();
  const rows=await sql`SELECT user_id FROM sessions WHERE token_hash=${await sha256(token)} AND expires_at>NOW() LIMIT 1`; if(!rows[0]) return null; return getUser(rows[0].user_id as string);
}
export async function requireUser(){ const u=await currentUser(); if(!u) throw new Error("UNAUTHENTICATED"); return u; }
export async function requireAdmin(){ const u=await requireUser(); if(u.role!=="admin") throw new Error("FORBIDDEN"); return u; }
