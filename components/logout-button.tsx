"use client"; import { useRouter } from "next/navigation";
export function LogoutButton(){const r=useRouter();return <button className="btn btn-ghost" onClick={async()=>{await fetch('/api/auth/logout',{method:'POST'});r.push('/');r.refresh();}}>Sign out</button>}
