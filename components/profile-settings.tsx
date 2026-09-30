"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProfileSettings({name,email,changePasswordHref}:{name:string;email:string;changePasswordHref:string}){
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
    r.refresh();
  }

  return <div>
    <form className="auth-form profile-form" onSubmit={submit}>
      <label>Full name<input name="name" defaultValue={name} required minLength={2}/></label>
      <label>Email address<input value={email} disabled/></label>
      {error&&<div className="form-error">{error}</div>}
      {message&&<div className="form-success">{message}</div>}
      <button className="btn btn-primary" disabled={busy}>{busy?"Saving…":"Save profile"}</button>
    </form>
    <div className="profile-security-row"><div><strong>Password</strong><p className="small-note">Update your account password securely.</p></div><Link href={changePasswordHref} className="btn btn-ghost">Change password</Link></div>
  </div>;
}
