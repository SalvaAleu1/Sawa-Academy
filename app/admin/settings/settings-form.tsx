"use client";
import { useState } from "react";
export function SettingsForm({settings}:{settings:Record<string,string>}){
  const[busy,setBusy]=useState(false),[message,setMessage]=useState(""),[error,setError]=useState("");
  async function save(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();setBusy(true);setMessage("");setError("");
    const body=Object.fromEntries(new FormData(e.currentTarget).entries());
    const res=await fetch("/api/admin/settings",{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify(body)});
    const out=await res.json();setBusy(false);if(!res.ok){setError(out.error||"Unable to save settings.");return;}setMessage("Settings saved.");
  }
  return <form className="studio-form" onSubmit={save}>
    <label>Support email<input type="email" name="supportEmail" defaultValue={settings.supportEmail||""} placeholder="support@example.com"/></label>
    <label>Certificate issuer<input name="certificateIssuer" defaultValue={settings.certificateIssuer||"Sawa Academy"} maxLength={80}/></label>
    <label>Default currency<select name="defaultCurrency" defaultValue={settings.defaultCurrency||"USD"}><option>USD</option><option>SSP</option></select></label>
    <label>Learning support note<textarea name="learningSupportNote" defaultValue={settings.learningSupportNote||"Use the AI tutor for explanations and hints while you learn."} maxLength={300}/></label>
    {error&&<div className="form-error">{error}</div>}{message&&<div className="form-success">{message}</div>}
    <button className="btn btn-primary" disabled={busy}>{busy?"Saving…":"Save settings"}</button>
  </form>
}
