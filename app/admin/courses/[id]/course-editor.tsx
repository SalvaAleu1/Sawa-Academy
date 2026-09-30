"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function CourseEditor({course}:{course:any}){
  const r=useRouter();const[busy,setBusy]=useState(false),[message,setMessage]=useState(""),[error,setError]=useState("");
  async function save(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();setBusy(true);setMessage("");setError("");
    const fd=new FormData(e.currentTarget);
    const body={
      id:course.id,
      title:String(fd.get("title")||""),
      subtitle:String(fd.get("subtitle")||""),
      description:String(fd.get("description")||""),
      category:String(fd.get("category")||""),
      level:String(fd.get("level")||""),
      price:Number(fd.get("price")||0),
      duration:String(fd.get("duration")||""),
      featured:fd.get("featured")==="on",
      published:fd.get("published")==="on",
      outcomes:String(fd.get("outcomes")||"").split("\n").map(x=>x.trim()).filter(Boolean),
      requirements:String(fd.get("requirements")||"").split("\n").map(x=>x.trim()).filter(Boolean)
    };
    const res=await fetch("/api/admin/course",{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify(body)});
    const out=await res.json();setBusy(false);if(!res.ok){setError(out.error||"Unable to save course.");return;}setMessage("Course updated.");r.refresh();
  }
  return <form className="studio-form" onSubmit={save}>
    <label>Course title<input name="title" defaultValue={course.title} required/></label>
    <label>Short description<input name="subtitle" defaultValue={course.subtitle} required/></label>
    <label>Full description<textarea name="description" defaultValue={course.description} required/></label>
    <div className="form-two"><label>Category<input name="category" defaultValue={course.category} required/></label><label>Level<input name="level" defaultValue={course.level} required/></label></div>
    <div className="form-two"><label>Price (USD)<input name="price" type="number" min="0" step="1" defaultValue={Number(course.price)}/></label><label>Duration<input name="duration" defaultValue={course.duration} required/></label></div>
    <label>Learning outcomes<textarea name="outcomes" defaultValue={(course.outcomes||[]).join("\n")}/></label>
    <label>Requirements<textarea name="requirements" defaultValue={(course.requirements||[]).join("\n")}/></label>
    <div className="checkbox-row"><label><input type="checkbox" name="featured" defaultChecked={course.featured}/> Featured course</label><label><input type="checkbox" name="published" defaultChecked={course.published}/> Published</label></div>
    {error&&<div className="form-error">{error}</div>}{message&&<div className="form-success">{message}</div>}
    <button className="btn btn-primary" disabled={busy}>{busy?"Saving…":"Save course"}</button>
  </form>;
}
