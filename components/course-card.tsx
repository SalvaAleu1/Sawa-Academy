import Link from "next/link";
import type { Course } from "@/lib/types";
export function CourseCard({course}:{course:Course}){
  const price=course.price===0?"Free":"$"+course.price;
  return <article className="course-card">
    <Link href={"/courses/"+course.slug} className="course-image" style={{backgroundImage:`linear-gradient(180deg,transparent,rgba(8,16,28,.62)),url(${course.image})`}}><span className="pill">{course.category}</span>{course.price===0&&<span className="pill free-pill">Free</span>}</Link>
    <div className="course-body"><div className="course-meta"><span>{course.level}</span><span>{course.duration}</span></div><h3><Link href={"/courses/"+course.slug}>{course.title}</Link></h3><p>{course.subtitle}</p><div className="course-bottom"><strong>{price}</strong><Link href={"/courses/"+course.slug}>View course →</Link></div></div>
  </article>;
}
