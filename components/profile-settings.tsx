"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProfileSettings({name,email}:{name:string;email:string}){
  const r=useRouter();
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState("");
  const [error,setError]=useState("");

  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();setBusy(true);setMessage("");setError("");
    const data=Object.fromEntries(new FormData(e.currentTarget).entries());
    const res=await fetch("/api/profile",{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify(data)});
    const out=await res.json();setBusy(false);
    if(!res.ok){setError(out.error||"Unable to update profile.");return;}
    setMessage("Profile updated.");
    (e.currentTarget.elements.namedItem("currentPassword") as HTMLInputElement).value="";
    (e.currentTarget.elements.namedItem("newPassword") as HTMLInputElement).value="";
    r.refresh();
  }

  return <form className="auth-form profile-form" onSubmit={submit}>
    <label>Full name<input name="name" defaultValue={name} required minLength={2}/></label>
    <label>Email address<input value={email} disabled/></label>
    <div className="profile-password"><h3>Change password</h3><p className="small-note">Leave these fields blank if you only want to update your name.</p></div>
    <label>Current password<input name="currentPassword" type="password" autoComplete="current-password"/></label>
    <label>New password<input name="newPassword" type="password" minLength={8} autoComplete="new-password"/></label>
    {error&&<div className="form-error">{error}</div>}
    {message&&<div className="form-success">{message}</div>}
    <button className="btn btn-primary" disabled={busy}>{busy?"Saving…":"Save changes"}</button>
  </form>;
}
