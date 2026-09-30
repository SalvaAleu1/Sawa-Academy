import { ensureDb,sql } from "@/lib/db";
import { CoursesClient } from "./courses-client";
export const dynamic="force-dynamic";
export default async function AdminCourses(){
  await ensureDb();
  const rows=await sql!`SELECT c.*,
    COUNT(DISTINCT m.id)::int modules_count,
    COUNT(DISTINCT l.id)::int lessons_count,
    COUNT(DISTINCT CASE WHEN l.type='practical' THEN l.id END)::int practical_count,
    COALESCE(SUM(DISTINCT CASE WHEN l.id IS NOT NULL THEN l.duration_minutes ELSE 0 END),0)::int study_minutes
    FROM courses c
    LEFT JOIN modules m ON m.course_id=c.id
    LEFT JOIN lessons l ON l.course_id=c.id
    GROUP BY c.id
    ORDER BY c.published DESC,c.featured DESC,c.created_at DESC` as any[];
  return <div><span className="eyebrow">Course operations</span><h1>Courses</h1><p>Review curriculum depth, practical work, pricing and publication status before learners see a course.</p><CoursesClient courses={rows}/></div>;
}
