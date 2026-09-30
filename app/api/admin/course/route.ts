import { NextResponse } from "next/server"; import { requireAdmin } from "@/lib/auth"; import { ensureDb,sql } from "@/lib/db";
const slugify=(s:string)=>s.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80);
export async function POST(req:Request){try{await requireAdmin();const b=await req.json();await ensureDb();const id=crypto.randomUUID();let slug=slugify(b.title||'course');const exists=await sql!`SELECT 1 FROM courses WHERE slug=${slug}`;if(exists[0])slug=`${slug}-${crypto.randomUUID().slice(0,5)}`;await sql!`INSERT INTO courses (id,slug,title,subtitle,description,category,level,price,currency,duration,image,featured,published,outcomes,requirements) VALUES (${id},${slug},${b.title},${b.subtitle||''},${b.description||''},${b.category||'Technology'},${b.level||'Beginner'},${Number(b.price)||0},'USD',${b.duration||'Self-paced'},${b.image||'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'},false,false,${JSON.stringify(b.outcomes||[])}::jsonb,${JSON.stringify(b.requirements||[])}::jsonb)`;for(let mi=0;mi<(b.modules||[]).length;mi++){const m=b.modules[mi];const mid=crypto.randomUUID();await sql!`INSERT INTO modules (id,course_id,title,position) VALUES (${mid},${id},${m.title||`Module ${mi+1}`},${mi+1})`;for(let li=0;li<(m.lessons||[]).length;li++){const l=m.lessons[li];await sql!`INSERT INTO lessons (id,module_id,course_id,slug,title,type,position,duration_minutes,summary,transcript,content,lab) VALUES (${crypto.randomUUID()},${mid},${id},${slugify(l.title||`lesson-${li+1}`)},${l.title||`Lesson ${li+1}`},${l.type==='practical'?'practical':'theory'},${li+1},${Number(l.durationMinutes)||15},${l.summary||''},${l.transcript||''},${l.content||''},${l.lab?JSON.stringify(l.lab):null}::jsonb)`;}}return NextResponse.json({ok:true,id,slug});}catch(e:any){return NextResponse.json({error:e.message||'Unable to save course.'},{status:400})}}
export async function PATCH(req:Request){try{
  await requireAdmin();
  const b=await req.json();
  await ensureDb();
  const id=String(b.id||"");
  if(!id)return NextResponse.json({error:"Course id is required."},{status:400});
  const exists=await sql!`SELECT 1 FROM courses WHERE id=${id} LIMIT 1`;
  if(!exists[0])return NextResponse.json({error:"Course not found."},{status:404});
  if(b.published===true){
    const quality=await sql!`SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE char_length(content)>=1000 AND char_length(transcript)>=700)::int AS ready
      FROM lessons WHERE course_id=${id}` as Array<{total:number;ready:number}>;
    const total=Number(quality[0]?.total||0),ready=Number(quality[0]?.ready||0);
    if(total<6||ready!==total)return NextResponse.json({error:"This course is not ready to publish. Every lesson needs substantial teaching notes and transcript content before learners can access it."},{status:400});
  }
  const hasDetails=typeof b.title==="string";
  if(hasDetails){
    const title=String(b.title).trim(),subtitle=String(b.subtitle||"").trim(),description=String(b.description||"").trim(),category=String(b.category||"Technology").trim(),level=String(b.level||"Beginner").trim(),duration=String(b.duration||"Self-paced").trim();
    const price=Math.max(0,Number(b.price)||0);
    if(title.length<3||subtitle.length<10||description.length<20)return NextResponse.json({error:"Course title and descriptions need more detail."},{status:400});
    const outcomes=Array.isArray(b.outcomes)?b.outcomes.map((x:any)=>String(x).trim()).filter(Boolean):[];
    const requirements=Array.isArray(b.requirements)?b.requirements.map((x:any)=>String(x).trim()).filter(Boolean):[];
    await sql!`UPDATE courses SET title=${title},subtitle=${subtitle},description=${description},category=${category},level=${level},price=${price},duration=${duration},featured=${!!b.featured},published=${!!b.published},outcomes=${JSON.stringify(outcomes)}::jsonb,requirements=${JSON.stringify(requirements)}::jsonb WHERE id=${id}`;
  }else{
    await sql!`UPDATE courses SET published=${!!b.published} WHERE id=${id}`;
  }
  return NextResponse.json({ok:true});
}catch(e:any){return NextResponse.json({error:e.message||'Unable to update course.'},{status:400})}}
