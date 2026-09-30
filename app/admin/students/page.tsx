import Link from "next/link";
import { ensureDb,sql } from "@/lib/db";
export const dynamic="force-dynamic";
export default async function Students(){
  await ensureDb();
  const rows=await sql!`SELECT u.id,u.name,u.email,u.created_at,COUNT(DISTINCT e.id)::int AS enrollments,COUNT(DISTINCT ce.id)::int AS certificates
    FROM users u
    LEFT JOIN enrollments e ON e.user_id=u.id
    LEFT JOIN certificates ce ON ce.user_id=u.id
    WHERE u.role='student'
    GROUP BY u.id ORDER BY u.created_at DESC` as any[];
  return <div><span className="eyebrow">Learner oversight</span><h1>Students</h1><p>Review learner accounts, enrollment activity and earned certificates.</p>
    <div className="table-wrap"><table className="table"><thead><tr><th>Student</th><th>Enrollments</th><th>Certificates</th><th>Joined</th><th></th></tr></thead><tbody>
      {rows.map(r=><tr key={r.id}><td><strong>{r.name}</strong><div className="small-note">{r.email}</div></td><td>{r.enrollments}</td><td>{r.certificates}</td><td>{new Date(r.created_at).toLocaleDateString()}</td><td><Link className="btn btn-ghost" href={"/admin/students/"+r.id}>View progress</Link></td></tr>)}
    </tbody></table></div>
  </div>;
}
