import { notFound } from "next/navigation";
import { ensureDb,sql } from "@/lib/db";
import { CourseEditor } from "./course-editor";
export const dynamic="force-dynamic";
export default async function ManageCourse({params}:{params:Promise<{id:string}>}){
  const {id}=await params;await ensureDb();
  const rows=await sql!`SELECT * FROM courses WHERE id=${id} LIMIT 1` as any[];
  if(!rows[0])notFound();
  const modules=await sql!`SELECT m.id,m.title,m.position,COUNT(l.id)::int lessons FROM modules m LEFT JOIN lessons l ON l.module_id=m.id WHERE m.course_id=${id} GROUP BY m.id ORDER BY m.position` as any[];
  const course=rows[0];
  return <div><span className="eyebrow">Course management</span><h1>{course.title}</h1><p>Edit learner-facing information and review the curriculum structure before publication.</p>
    <div className="admin-course-grid"><div className="card"><h2>Course details</h2><CourseEditor course={course}/></div>
    <div className="card"><h2>Curriculum</h2><div className="curriculum">{modules.map(m=><div className="module" key={m.id}><div className="course-meta"><strong>{m.position}. {m.title}</strong><span>{m.lessons} lessons</span></div></div>)}</div><p className="small-note">Create new course drafts in AI Course Studio. Curriculum structures remain protected from accidental raw database edits.</p></div></div>
  </div>;
}
