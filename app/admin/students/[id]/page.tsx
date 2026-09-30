import { notFound } from "next/navigation";
import { ensureDb,sql } from "@/lib/db";
export const dynamic="force-dynamic";
export default async function StudentDetail({params}:{params:Promise<{id:string}>}){
  const {id}=await params;await ensureDb();
  const users=await sql!`SELECT id,name,email,created_at FROM users WHERE id=${id} AND role='student' LIMIT 1` as any[];
  if(!users[0])notFound();
  const student=users[0];
  const rows=await sql!`SELECT c.id,c.title,c.slug,e.enrolled_at,
    COUNT(DISTINCT l.id)::int total_lessons,
    COUNT(DISTINCT CASE WHEN p.completed=true THEN p.lesson_id END)::int completed_lessons
    FROM enrollments e JOIN courses c ON c.id=e.course_id
    LEFT JOIN lessons l ON l.course_id=c.id
    LEFT JOIN progress p ON p.course_id=c.id AND p.user_id=e.user_id AND p.lesson_id=l.id
    WHERE e.user_id=${id} AND e.status='active'
    GROUP BY c.id,e.enrolled_at ORDER BY e.enrolled_at DESC` as any[];
  const certs=await sql!`SELECT ce.verification_code,ce.issued_at,c.title FROM certificates ce JOIN courses c ON c.id=ce.course_id WHERE ce.user_id=${id} ORDER BY ce.issued_at DESC` as any[];
  return <div><span className="eyebrow">Student record</span><h1>{student.name}</h1><p>{student.email} · Joined {new Date(student.created_at).toLocaleDateString()}</p>
    <div className="card"><h2>Course progress</h2>{rows.length===0?<p>No active enrollments.</p>:<div className="profile-progress-list">{rows.map(r=>{const pct=r.total_lessons?Math.round(Number(r.completed_lessons)/Number(r.total_lessons)*100):0;return <div className="profile-progress" key={r.id}><div className="course-meta"><strong>{r.title}</strong><span>{r.completed_lessons}/{r.total_lessons} lessons</span></div><div className="progress-bar"><span style={{width:pct+"%"}}/></div><div className="course-meta"><span>{pct}% complete</span><span>Enrolled {new Date(r.enrolled_at).toLocaleDateString()}</span></div></div>})}</div>}</div>
    <div className="card"><h2>Certificates</h2>{certs.length===0?<p>No certificates issued.</p>:<div className="certificate-list">{certs.map(c=><div className="certificate-row" key={c.verification_code}><div><strong>{c.title}</strong><div className="small-note">{c.verification_code}</div></div><span>{new Date(c.issued_at).toLocaleDateString()}</span></div>)}</div>}</div>
  </div>;
}
