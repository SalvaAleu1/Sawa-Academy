"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ChangePasswordForm({returnTo}:{returnTo:string}){
  const r=useRouter();
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  const [message,setMessage]=useState("");

  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();setBusy(true);setError("");setMessage("");
    const fd=new FormData(e.currentTarget);
    const currentPassword=String(fd.get("currentPassword")||"");
    const newPassword=String(fd.get("newPassword")||"");
    const confirmPassword=String(fd.get("confirmPassword")||"");
    if(newPassword!==confirmPassword){setBusy(false);setError("New passwords do not match.");return;}
    const res=await fetch("/api/profile/password",{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify({currentPassword,newPassword})});
    const out=await res.json();setBusy(false);
    if(!res.ok){setError(out.error||"Unable to change password.");return;}
    setMessage("Password changed successfully.");
    e.currentTarget.reset();
    setTimeout(()=>r.push(returnTo),700);
  }

  return <form className="auth-form" onSubmit={submit}>
    <label>Current password<input name="currentPassword" type="password" required autoComplete="current-password"/></label>
    <label>New password<input name="newPassword" type="password" required minLength={10} autoComplete="new-password"/></label>
    <label>Confirm new password<input name="confirmPassword" type="password" required minLength={10} autoComplete="new-password"/></label>
    {error&&<div className="form-error">{error}</div>}
    {message&&<div className="form-success">{message}</div>}
    <button className="btn btn-primary" disabled={busy}>{busy?"Updating…":"Update password"}</button>
  </form>;
}
