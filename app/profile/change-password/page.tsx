import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { ChangePasswordForm } from "@/components/change-password-form";
export const dynamic="force-dynamic";
export default async function ChangePassword(){
  const user=await currentUser();if(!user)redirect("/login");if(user.role==="admin")redirect("/admin/profile/change-password");
  return <main className="auth-shell"><div className="auth-card"><span className="eyebrow">Account security</span><h1>Change password</h1><p>Enter your current password and choose a new password for your student account.</p><ChangePasswordForm returnTo="/profile"/><p className="small-note"><Link href="/profile"><strong>← Back to profile</strong></Link></p></div></main>;
}
