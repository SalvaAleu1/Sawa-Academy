"use client";
import Link from "next/link";
import { useState } from "react";
export function CoursesClient({courses}:{courses:any[]}){
  const [items,setItems]=useState(courses);
  const [error,setError]=useState("");
  async function toggle(id:string,published:boolean){
    setError("");
    const r=await fetch("/api/admin/course",{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify({id,published:!published})});
    const d=await r.json();
    if(!r.ok){setError(d.error||"Unable to change publication status.");return;}
    setItems(xs=>xs.map(x=>x.id===id?{...x,published:!published}:x));
  }
  return <div>{error&&<div className="form-error" style={{marginBottom:16}}>{error}</div>}<div className="table-wrap"><table className="table"><thead><tr><th>Course</th><th>Depth</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead><tbody>
    {items.map(c=>{const paid=Number(c.price)>0;const ready=paid?Number(c.study_minutes)>=300&&Number(c.practical_count)>=3:Number(c.lessons_count)>=6;return <tr key={c.id}>
      <td><strong>{c.title}</strong><div className="small-note">{c.category} · {c.level}</div></td>
      <td><div>{c.modules_count} modules · {c.lessons_count} lessons</div><div className="small-note">{c.practical_count} practical · ~{Math.round(Number(c.study_minutes)/60*10)/10} authored hours</div></td>
      <td>{Number(c.price)===0?<strong>Free</strong>:("$"+Number(c.price).toFixed(0))}</td>
      <td><span className={c.published?"status-good":ready?"status-warn":"status-warn"}>{c.published?"Published":ready?"Ready for review":"In development"}</span></td>
      <td><div className="table-actions"><Link className="btn btn-ghost" href={"/admin/courses/"+c.id}>Manage</Link><button className="btn btn-ghost" onClick={()=>toggle(c.id,c.published)}>{c.published?"Unpublish":"Publish"}</button></div></td>
    </tr>})}
  </tbody></table></div></div>;
}
