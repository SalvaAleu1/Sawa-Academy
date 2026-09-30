"use client";
import Link from "next/link";
import { useState } from "react";
export function CoursesClient({courses}:{courses:any[]}){
  const [items,setItems]=useState(courses);
  async function toggle(id:string,published:boolean){
    const r=await fetch("/api/admin/course",{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify({id,published:!published})});
    if(r.ok)setItems(xs=>xs.map(x=>x.id===id?{...x,published:!published}:x));
  }
  return <div className="table-wrap"><table className="table"><thead><tr><th>Course</th><th>Curriculum</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead><tbody>
    {items.map(c=><tr key={c.id}>
      <td><strong>{c.title}</strong><div className="small-note">{c.category} · {c.level}</div></td>
      <td>{c.modules_count} modules · {c.lessons_count} lessons</td>
      <td>{Number(c.price)===0?<strong>Free</strong>:("$"+Number(c.price).toFixed(0))}</td>
      <td><span className={c.published?"status-good":"status-warn"}>{c.published?"Published":"Draft"}</span></td>
      <td><div className="table-actions"><Link className="btn btn-ghost" href={"/admin/courses/"+c.id}>Manage</Link><button className="btn btn-ghost" onClick={()=>toggle(c.id,c.published)}>{c.published?"Unpublish":"Publish"}</button></div></td>
    </tr>)}
  </tbody></table></div>;
}
