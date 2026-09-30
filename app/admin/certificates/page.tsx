import { ensureDb,sql } from "@/lib/db";
export const dynamic="force-dynamic";
export default async function Certificates(){
  await ensureDb();
  const rows=await sql!`SELECT ce.verification_code,ce.issued_at,u.name,u.email,c.title
    FROM certificates ce JOIN users u ON u.id=ce.user_id JOIN courses c ON c.id=ce.course_id
    ORDER BY ce.issued_at DESC` as any[];
  return <div><span className="eyebrow">Credentials</span><h1>Certificates</h1><p>Review certificates issued after successful course completion and assessment.</p>
    {rows.length===0?<div className="card"><h2>No certificates issued yet</h2><p>Certificates will appear here when learners complete eligible courses.</p></div>:
    <table className="table"><thead><tr><th>Learner</th><th>Course</th><th>Verification code</th><th>Issued</th></tr></thead><tbody>{rows.map(r=><tr key={r.verification_code}><td><strong>{r.name}</strong><div className="small-note">{r.email}</div></td><td>{r.title}</td><td>{r.verification_code}</td><td>{new Date(r.issued_at).toLocaleDateString()}</td></tr>)}</tbody></table>}
  </div>;
}
