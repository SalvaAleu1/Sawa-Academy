import Link from "next/link";
import { ensureDb,sql } from "@/lib/db";
export const dynamic="force-dynamic";

export default async function Admin(){
  await ensureDb();
  const [students,courses,published,freeCourses,enrollments,certificates,payments,revenue]=await Promise.all([
    sql!`SELECT COUNT(*)::int n FROM users WHERE role='student'`,
    sql!`SELECT COUNT(*)::int n FROM courses`,
    sql!`SELECT COUNT(*)::int n FROM courses WHERE published=true`,
    sql!`SELECT COUNT(*)::int n FROM courses WHERE published=true AND price=0`,
    sql!`SELECT COUNT(*)::int n FROM enrollments WHERE status='active'`,
    sql!`SELECT COUNT(*)::int n FROM certificates`,
    sql!`SELECT COUNT(*)::int n FROM payments WHERE status='paid'`,
    sql!`SELECT COALESCE(SUM(amount),0)::numeric total FROM payments WHERE status='paid'`
  ]);
  const metric=(r:any)=>Number(r[0]?.n||0);
  return <div className="admin-dashboard">
    <div className="admin-hero"><div><span className="eyebrow">Administration</span><h1>Academy operations</h1><p>Manage learning content, monitor student progress, oversee certificates and keep the platform ready for learners.</p></div><Link href="/admin/studio" className="btn btn-primary">Create course</Link></div>

    <div className="admin-metrics">
      <div className="card"><span className="eyebrow">Students</span><div className="price">{metric(students)}</div><p>Registered learner accounts</p></div>
      <div className="card"><span className="eyebrow">Published</span><div className="price">{metric(published)}</div><p>{metric(courses)} total courses · {metric(freeCourses)} free</p></div>
      <div className="card"><span className="eyebrow">Enrollments</span><div className="price">{metric(enrollments)}</div><p>Active course enrollments</p></div>
      <div className="card"><span className="eyebrow">Certificates</span><div className="price">{metric(certificates)}</div><p>Issued and verifiable</p></div>
    </div>

    <section className="admin-section"><div className="section-head compact"><div><span className="eyebrow">Administrator responsibilities</span><h2>What you manage</h2></div></div>
      <div className="admin-role-grid">
        <Link href="/admin/courses" className="card admin-role-card"><h3>Course management</h3><p>Review curricula, edit course information, set pricing, publish or unpublish courses, and keep learning content accurate.</p><strong>Manage courses →</strong></Link>
        <Link href="/admin/students" className="card admin-role-card"><h3>Learner oversight</h3><p>Review student accounts, enrollments, lesson progress and completion status without mixing learner and administrator roles.</p><strong>Review students →</strong></Link>
        <Link href="/admin/certificates" className="card admin-role-card"><h3>Certificates</h3><p>Track issued certificates and confirm the learner, course, verification code and issue date.</p><strong>View certificates →</strong></Link>
        <Link href="/admin/settings" className="card admin-role-card"><h3>Platform settings</h3><p>Manage non-secret academy settings and verify the live status of database, AI and payment services.</p><strong>Open settings →</strong></Link>
      </div>
    </section>

    <section className="card admin-finance"><h2>Payments</h2><div className="course-meta"><span>Successful payments: <strong>{metric(payments)}</strong></span><span>Recorded revenue: <strong>${Number(revenue[0]?.total||0).toFixed(2)}</strong></span></div><p className="small-note">Payments remain unavailable to learners while PAYMENTS_ENABLED is false.</p></section>
  </div>;
}
