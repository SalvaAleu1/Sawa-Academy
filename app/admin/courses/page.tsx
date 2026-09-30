import { ensureDb,sql } from "@/lib/db";
import { CoursesClient } from "./courses-client";
export const dynamic="force-dynamic";
export default async function AdminCourses(){
  await ensureDb();
  const rows=await sql!`SELECT c.*,
    (SELECT COUNT(*)::int FROM modules m WHERE m.course_id=c.id) AS modules_count,
    (SELECT COUNT(*)::int FROM lessons l WHERE l.course_id=c.id) AS lessons_count,
    (SELECT COUNT(*)::int FROM lessons l WHERE l.course_id=c.id AND l.type='practical') AS practical_count,
    (SELECT COALESCE(SUM(l.duration_minutes),0)::int FROM lessons l WHERE l.course_id=c.id) AS study_minutes
    FROM courses c
    ORDER BY c.published DESC,c.featured DESC,c.created_at DESC` as any[];
  return <div><span className="eyebrow">Course operations</span><h1>Courses</h1><p>Review curriculum depth, practical work, pricing and publication status before learners see a course.</p><CoursesClient courses={rows}/></div>;
}
