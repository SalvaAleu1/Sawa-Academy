import { CourseCard } from "@/components/course-card";
import { getCourses } from "@/lib/db";
export const dynamic="force-dynamic";
export default async function Courses(){
  const courses=await getCourses();
  const free=courses.filter(c=>c.price===0);
  const professional=courses.filter(c=>c.price>0);
  return <main>
    <section className="page-hero"><div className="container"><span className="eyebrow">Course catalogue</span><h1>Build skills with structured learning paths.</h1><p>Start with free foundations, then progress into project-based courses in software development, cloud, cybersecurity, AI and developer tools.</p></div></section>
    {free.length>0&&<section className="section"><div className="container"><div className="section-head"><div><span className="eyebrow">Free learning</span><h2>Start with the foundations</h2><p className="section-copy">Free courses are designed for theory, orientation and essential digital skills. Create an account and enroll without payment.</p></div></div><div className="course-grid">{free.map(c=><CourseCard key={c.id} course={c}/>)}</div></div></section>}
    <section className="section alt"><div className="container"><div className="section-head"><div><span className="eyebrow">Professional learning paths</span><h2>Develop practical technology skills</h2><p className="section-copy">Multi-module courses combine explanations, guided practice, AI tutoring, progress tracking and a final assessment.</p></div></div><div className="course-grid">{professional.map(c=><CourseCard key={c.id} course={c}/>)}</div></div></section>
  </main>;
}
