import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { ensureDb,getLessons,getUserEnrollments,progressFor,sql } from "@/lib/db";
import { LogoutButton } from "@/components/logout-button";
import { ProfileSettings } from "@/components/profile-settings";

export const dynamic="force-dynamic";

export default async function ProfilePage(){
  const user=await currentUser();
  if(!user)redirect("/login");
  if(user.role==="admin")redirect("/admin/profile");

  const courses=await getUserEnrollments(user.id);
  await ensureDb();
  const certRows=await sql!`SELECT c.slug,c.title,ce.verification_code,ce.issued_at
    FROM certificates ce JOIN courses c ON c.id=ce.course_id
    WHERE ce.user_id=${user.id} ORDER BY ce.issued_at DESC` as any[];

  const progress=await Promise.all(courses.map(async c=>{
    const lessons=await getLessons(c.id);
    const done=await progressFor(user.id,c.id);
    return {course:c,pct:lessons.length?Math.round(done.size/lessons.length*100):0,done:done.size,total:lessons.length};
  }));
  const completed=progress.filter(x=>x.pct===100).length;

  return <main className="dashboard-shell"><div className="container profile-shell">
    <div className="dashboard-head"><div><span className="eyebrow">Student profile</span><h1>{user.name}</h1><p className="small-note">{user.email}</p></div><LogoutButton/></div>

    <div className="profile-stats">
      <div className="card"><span className="eyebrow">Enrolled</span><div className="price">{courses.length}</div><p>Active courses</p></div>
      <div className="card"><span className="eyebrow">Completed</span><div className="price">{completed}</div><p>Courses at 100%</p></div>
      <div className="card"><span className="eyebrow">Certificates</span><div className="price">{certRows.length}</div><p>Verified achievements</p></div>
    </div>

    <div className="profile-grid">
      <section className="card"><h2>Profile settings</h2><ProfileSettings name={user.name} email={user.email} changePasswordHref="/profile/change-password"/></section>
      <section className="card"><div className="section-head compact"><div><span className="eyebrow">Learning</span><h2>Course progress</h2></div><Link href="/dashboard" className="btn btn-ghost">My Learning</Link></div>
        {progress.length===0?<p>You have not enrolled in a course yet.</p>:<div className="profile-progress-list">{progress.map(({course,pct,done,total})=><div className="profile-progress" key={course.id}><div className="course-meta"><strong>{course.title}</strong><span>{done}/{total} lessons</span></div><div className="progress-bar"><span style={{width:`${pct}%`}}/></div><div className="course-meta"><span>{pct}% complete</span><Link href={`/courses/${course.slug}`}><strong>View course</strong></Link></div></div>)}</div>}
      </section>
    </div>

    <section className="card profile-certificates"><div className="section-head compact"><div><span className="eyebrow">Achievements</span><h2>Certificates</h2></div><Link href="/verify" className="btn btn-ghost">Verify a certificate</Link></div>
      {certRows.length===0?<p>Certificates you earn will appear here.</p>:<div className="certificate-list">{certRows.map(c=><div className="certificate-row" key={c.verification_code}><div><strong>{c.title}</strong><div className="small-note">{c.verification_code} · {new Date(c.issued_at).toLocaleDateString()}</div></div><Link href={`/certificate/${c.slug}`} className="btn btn-ghost">Open</Link></div>)}</div>}
    </section>
  </div></main>;
}
