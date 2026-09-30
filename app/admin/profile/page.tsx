import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProfileSettings } from "@/components/profile-settings";
import { LogoutButton } from "@/components/logout-button";

export const dynamic="force-dynamic";

export default async function AdminProfile(){
  const user=await currentUser();
  if(!user)redirect("/login");
  if(user.role!=="admin")redirect("/profile");
  return <div className="profile-shell">
    <div className="dashboard-head"><div><span className="eyebrow">Administrator profile</span><h1>{user.name}</h1><p className="small-note">{user.email} · Administrator</p></div><LogoutButton/></div>
    <div className="card" style={{maxWidth:680}}>
      <h2>Account settings</h2>
      <p>Update your administrator profile or change your password. Your administrator role cannot be changed from this page.</p>
      <ProfileSettings name={user.name} email={user.email}/>
    </div>
  </div>;
}
