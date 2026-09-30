import type { MetadataRoute } from "next"; import { getCourses } from "@/lib/db";
export const dynamic="force-dynamic";
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const base=process.env.NEXT_PUBLIC_APP_URL||'https://sawa.academy';let cs:any[]=[];try{cs=await getCourses()}catch{}return [{url:base,changeFrequency:'weekly',priority:1},{url:`${base}/courses`,changeFrequency:'weekly',priority:.9},...cs.map(c=>({url:`${base}/courses/${c.slug}`,changeFrequency:'weekly' as const,priority:.8}))]}
