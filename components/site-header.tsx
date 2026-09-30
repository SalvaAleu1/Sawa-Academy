import Link from "next/link";
import { currentUser } from "@/lib/auth";

export async function SiteHeader(){
  const user=await currentUser();
  return <header className="site-header"><div className="container nav-wrap">
    <Link href="/" className="brand"><span className="brand-mark">S</span><span>Sawa Academy</span></Link>
    <nav className="main-nav"><Link href="/courses">Courses</Link><Link href="/#how-it-works">How it works</Link><Link href="/#faq">FAQ</Link></nav>
    <div className="nav-actions">{user ? <><Link href="/dashboard" className="btn btn-ghost">Dashboard</Link>{user.role==="admin"&&<Link href="/admin" className="btn btn-ghost">Admin</Link>}</> : <><Link href="/login" className="btn btn-ghost">Sign in</Link><Link href="/register" className="btn btn-primary">Start learning</Link></>}</div>
  </div></header>
}
