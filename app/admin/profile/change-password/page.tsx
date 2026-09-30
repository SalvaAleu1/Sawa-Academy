import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { ChangePasswordForm } from "@/components/change-password-form";
export const dynamic="force-dynamic";
export default async function AdminChangePassword(){
  const user=await currentUser();if(!user)redirect("/login");if(user.role!=="admin")redirect("/profile/change-password");
  return <div className="profile-shell"><div><span className="eyebrow">Account security</span><h1>Change administrator password</h1><p>Use your current password to authorize this change.</p></div><div className="card" style={{maxWidth:620}}><ChangePasswordForm returnTo="/admin/profile"/><p className="small-note"><Link href="/admin/profile"><strong>← Back to profile</strong></Link></p></div></div>;
}
