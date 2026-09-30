import { notFound } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { BuyButton } from "@/components/buy-button";
import { getCourse,getLessons,getModules,isEnrolled } from "@/lib/db";
export const dynamic="force-dynamic";
export default async function CoursePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const course=await getCourse(slug);if(!course)notFound();
  const user=await currentUser();if(!course.published&&user?.role!=="admin")notFound();
  const [mods,lessons]=await Promise.all([getModules(course.id),getLessons(course.id)]);
  const enrolled=user?await isEnrolled(user.id,course.id):false;
  const totalMinutes=lessons.reduce((sum,l)=>sum+l.durationMinutes,0);
  const practicalCount=lessons.filter(l=>l.type==="practical").length;
  return <main>
    <section className="page-hero course-hero"><div className="container"><span className="eyebrow">{course.category}</span><h1>{course.title}</h1><p>{course.subtitle}</p><div className="course-facts"><span>{course.level}</span><span>{mods.length} modules</span><span>{lessons.length} lessons</span><span>{Math.max(1,Math.round(totalMinutes/60))}+ hours guided learning</span></div></div></section>
    <section className="section"><div className="container course-detail"><div>
      <div className="card"><h2>About this course</h2><p>{course.description}</p><h3>What you will learn</h3><ul className="clean-list">{course.outcomes.map(x=><li key={x}>{x}</li>)}</ul></div>
      <div className="card curriculum-card"><div className="section-head compact"><div><span className="eyebrow">Curriculum</span><h2>Course content</h2></div><span className="small-note">{practicalCount} guided practical lessons</span></div><div className="curriculum">{mods.map(m=><div className="module" key={m.id}><h3>{m.position}. {m.title}</h3>{lessons.filter(l=>l.moduleId===m.id).map(l=><div className="lesson-row" key={l.id}><span>{l.type==="practical"?"Practice":"Lesson"} · {l.title}</span><span>{l.durationMinutes} min</span></div>)}</div>)}</div></div>
    </div>
    <aside className="card sticky"><img src={course.image} alt="" style={{width:"100%",borderRadius:14,aspectRatio:"16/10",objectFit:"cover"}}/><div className="price">{course.price===0?"Free":"$"+course.price}</div><p>{course.level} · {course.duration}</p><BuyButton courseId={course.id} loggedIn={!!user} enrolled={enrolled} isFree={course.price===0}/><h4>This course includes</h4><ul className="clean-list"><li>{mods.length} structured modules</li><li>{lessons.length} lessons</li><li>Course-aware AI tutor</li><li>Progress tracking</li><li>Final assessment and certificate eligibility</li></ul><h4>Requirements</h4><ul className="clean-list">{course.requirements.map(x=><li key={x}>{x}</li>)}</ul></aside>
    </div></section>
  </main>;
}
